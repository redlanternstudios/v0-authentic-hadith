"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"

export type LanguagePreference = "english" | "arabic" | "both"

interface UseLanguageReturn {
  language: LanguagePreference
  isArabicPrimary: boolean
  showBoth: boolean
  isLoading: boolean
  setLanguage: (lang: LanguagePreference) => Promise<void>
}

export function useLanguage(): UseLanguageReturn {
  const supabase = createClient()

  const { data, isLoading, mutate } = useSWR(
    "user-language-preference",
    async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return { language: "english" as LanguagePreference }

      const { data: prefs } = await supabase
        .from("user_preferences")
        .select("language")
        .eq("user_id", user.id)
        .single()

      return { language: (prefs?.language || "english") as LanguagePreference }
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  )

  const language = data?.language || "english"

  const setLanguage = async (newLang: LanguagePreference) => {
    // Optimistically update
    mutate({ language: newLang }, false)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from("user_preferences")
      .upsert({
        user_id: user.id,
        language: newLang,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" })

    // Revalidate
    mutate()
  }

  return {
    language,
    isArabicPrimary: language === "arabic",
    showBoth: language === "both",
    isLoading,
    setLanguage,
  }
}

// Helper to get display order based on language preference
export function getTextOrder(language: LanguagePreference): "arabic-first" | "english-first" | "both" {
  if (language === "arabic") return "arabic-first"
  if (language === "both") return "both"
  return "english-first"
}
