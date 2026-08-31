import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export interface Profile {
  name: string | null;
  whatsapp: string | null;
}

interface ProfileContextValue {
  profile: Profile | null;
  loading: boolean;
  updateProfile: (patch: Partial<Profile>) => Promise<{ error: string | null }>;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    supabase
      .from("profiles")
      .select("name, whatsapp")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (cancelled) return;
        setProfile(error ? null : (data as Profile));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  // Fonte de verdade: public.profiles (name/whatsapp). Após um update bem-sucedido, o contexto
  // já é atualizado com o retorno do próprio Supabase — Home, Perfil e Dados pessoais consomem o
  // mesmo contexto, então nenhuma tela precisa de refresh para refletir o novo valor.
  const updateProfile = useCallback(
    async (patch: Partial<Profile>) => {
      if (!user) return { error: "Sessão inválida." };
      const { data, error } = await supabase
        .from("profiles")
        .update(patch)
        .eq("id", user.id)
        .select("name, whatsapp")
        .single();
      if (error) return { error: "Não foi possível salvar suas informações. Tente novamente." };
      setProfile(data as Profile);
      return { error: null };
    },
    [user],
  );

  return (
    <ProfileContext.Provider value={{ profile, loading, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile deve ser usado dentro de ProfileProvider");
  return ctx;
}
