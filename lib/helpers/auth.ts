import { createClient } from "../supabase/client";
import { AuthFormData } from "../types/auth";


const supabaseClient = createClient();

export async function login({ email, password }: AuthFormData) {
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (error) {
    return {
      data: null,
      error: {
        message:
          error instanceof Error ? error.message : "An unexpected error occurred during login.",
      },
    };
  }
}

export async function signup({ email, password }: AuthFormData) {
  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });
    return { data, error };
  } catch (error) {
    return {
      data: null,
      error: {
        message:
          error instanceof Error ? error.message : "An unexpected error occurred during sign up.",
      },
    };
  }
}

export async function logout() {
  try {
    const { error } = await supabaseClient.auth.signOut();
    return { error };
  } catch (error) {
    return {
      error: {
        message:
          error instanceof Error ? error.message : "An unexpected error occurred during logout.",
      },
    };
  }
}

export async function loginWithGoogle() {
  try {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  } catch (error) {
    return {
      data: null,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during Google sign in.",
      },
    };
  }
}
