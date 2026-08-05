"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Globe, Code2 } from "lucide-react"

interface SocialAuthButtonsProps {
  onGoogleClick?: () => void
  onGithubClick?: () => void
}

export function SocialAuthButtons({
  onGoogleClick = () => {},
  onGithubClick = () => {},
}: SocialAuthButtonsProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <Button
        type="button"
        variant="outline"
        className="w-full h-10 border-border/80 bg-background/50 hover:bg-accent/50 text-foreground font-medium transition-all shadow-xs gap-2.5 rounded-lg"
        onClick={onGoogleClick}
      >
        <Globe className="size-4 text-muted-foreground" />
        <span>Continue with Google</span>
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full h-10 border-border/80 bg-background/50 hover:bg-accent/50 text-foreground font-medium transition-all shadow-xs gap-2.5 rounded-lg"
        onClick={onGithubClick}
      >
        <Code2 className="size-4 text-muted-foreground" />
        <span>Continue with GitHub</span>
      </Button>
    </div>
  )
}
