"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Rss,
  KeyRound,
  Keyboard,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const PUBLIC_KEYS = {
  ssh: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAGqH4YnO9Z2X98L1p02x0W3kK1b7Z0Lq3Y7Z1W9b9L1 swilczek.lx@gmail.com",
  gpgKeyId: "B8E944071CB7EB8A",
  gpgUrl: "https://github.com/szymonwilczek.gpg",
  keysUrl: "https://github.com/szymonwilczek.keys",
};

export default function MiscPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    toast.success(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <main className="mx-auto mb-16 -mt-10 bg-background px-6 md:px-12 transition-colors duration-300 z-0">
      <div className="max-w-4xl mx-auto space-y-10">
        <div
          className="space-y-4 animate-in slide-in-from-bottom-8 fade-in duration-700"
          style={{ animationFillMode: "both" }}
        >
          <Button
            variant="ghost"
            asChild
            className="-ml-4 text-muted-foreground"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold font-jetbrains tracking-tight">
            Misc<span className="text-muted-foreground">/Extras</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Collection of tools, public keys, activity streams, and interactive
            experiments.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-150"
          style={{ animationFillMode: "both" }}
        >
          <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500 shrink-0">
                  <Rss className="h-5 w-5" />
                </div>
              </div>
              <CardTitle className="font-jetbrains text-xl">
                Activity Feed
              </CardTitle>
              <CardDescription className="leading-relaxed">
                My real-time activity stream containing GitHub commit history,
                WakaTime coding stats, and Spotify listening activity.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                asChild
                variant="outline"
                className="w-full font-jetbrains group"
              >
                <Link href="/feed" target="_blank" rel="noopener noreferrer">
                  <span>Open Feed</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                  <KeyRound className="h-5 w-5" />
                </div>
              </div>
              <CardTitle className="font-jetbrains text-xl">
                Public Keys (GPG / SSH)
              </CardTitle>
              <CardDescription className="leading-relaxed">
                Cryptographic identity & public keys to verify my signed Git
                commits, authenticate signatures, or grant SSH access.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full font-jetbrains">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Verify My Public Keys
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-jetbrains text-xl flex items-center gap-2">
                      <KeyRound className="h-5 w-5 text-primary" /> Identity &
                      Public Keys
                    </DialogTitle>
                    <DialogDescription>
                      Use these public keys to verify my signed Git commits or
                      add me to your authorized SSH hosts.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 my-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-jetbrains font-semibold text-muted-foreground uppercase tracking-wider">
                          GPG Key ID (Commit Verification)
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs font-jetbrains"
                          onClick={() =>
                            copyToClipboard(PUBLIC_KEYS.gpgKeyId, "GPG Key ID")
                          }
                        >
                          {copiedKey === "GPG Key ID" ? (
                            <>
                              <Check className="mr-1 h-3.5 w-3.5 text-emerald-500" />{" "}
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-3.5 w-3.5" /> Copy ID
                            </>
                          )}
                        </Button>
                      </div>
                      <pre className="p-3 rounded-lg bg-muted/60 text-xs font-jetbrains overflow-x-auto border border-border/50 text-foreground font-semibold">
                        {PUBLIC_KEYS.gpgKeyId}
                      </pre>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-jetbrains font-semibold text-muted-foreground uppercase tracking-wider">
                          SSH Public Key
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs font-jetbrains"
                          onClick={() =>
                            copyToClipboard(PUBLIC_KEYS.ssh, "SSH Key")
                          }
                        >
                          {copiedKey === "SSH Key" ? (
                            <>
                              <Check className="mr-1 h-3.5 w-3.5 text-emerald-500" />{" "}
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-3.5 w-3.5" /> Copy Key
                            </>
                          )}
                        </Button>
                      </div>
                      <pre className="p-3 rounded-lg bg-muted/60 text-[11px] font-jetbrains overflow-x-auto break-all whitespace-pre-wrap border border-border/50 text-foreground/90">
                        {PUBLIC_KEYS.ssh}
                      </pre>
                    </div>

                    <div className="pt-2 border-t border-border/40 flex flex-wrap gap-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="text-xs font-jetbrains"
                      >
                        <a
                          href={PUBLIC_KEYS.keysUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Raw
                          SSH Keys (.keys)
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="text-xs font-jetbrains"
                      >
                        <a
                          href={PUBLIC_KEYS.gpgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Raw
                          GPG Key (.gpg)
                        </a>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0">
                  <Keyboard className="h-5 w-5" />
                </div>
              </div>
              <CardTitle className="font-jetbrains text-xl">
                Typing Speed Practice
              </CardTitle>
              <CardDescription className="leading-relaxed">
                Typing speed practice I've built to practice my most common
                error words.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                asChild
                variant="outline"
                className="w-full font-jetbrains group"
              >
                <Link href="/typing">
                  <span>Open Typing Benchmark</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
