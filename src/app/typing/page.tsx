"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Database,
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
import { Progress } from "@/components/ui/progress";

const DEFAULT_POLISH_WORDS = [
  "mimo",
  "kilka",
  "by",
  "natychmiast",
  "długo",
  "mój",
  "przed",
  "bardzo",
  "czego",
  "zrobić",
  "jak",
  "za",
  "we",
  "czym",
  "taki",
  "zanim",
  "także",
  "drogi",
  "jeżeli",
  "poza",
  "zaś",
  "właśnie",
  "głos",
  "dwa",
  "świat",
  "mężczyzna",
  "myśl",
];

interface WordState {
  word: string;
  typed: string;
  status: "untyped" | "correct" | "wrong";
}

export default function TypingPage() {
  const [problemWords, setProblemWords] = useState<string[]>([]);
  const [isDbLoaded, setIsDbLoaded] = useState(false);
  const [words, setWords] = useState<WordState[]>([]);

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [stats, setStats] = useState({
    correctChars: 0,
    wrongChars: 0,
    correctWordsCount: 0,
    wrongWordsCount: 0,
    wrongWordsList: [] as string[],
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);

  // fetch problem words from MongoDB API
  useEffect(() => {
    async function fetchWords() {
      try {
        const res = await fetch("/api/typing/words?language=Polish&limit=150");
        const data = await res.json();
        if (
          data.success &&
          Array.isArray(data.words) &&
          data.words.length > 0
        ) {
          const dbWords = data.words.map((w: { word: string }) => w.word);
          setProblemWords(dbWords);
          setIsDbLoaded(true);
          initTest(dbWords);
          return;
        }
      } catch (err) {
        console.warn(
          "Could not fetch DB problem words, falling back to defaults",
          err,
        );
      }
      initTest(DEFAULT_POLISH_WORDS);
    }

    fetchWords();
  }, []);

  // initialize random words for the test
  function initTest(pool: string[]) {
    const activePool = pool.length > 0 ? pool : DEFAULT_POLISH_WORDS;
    const shuffled: WordState[] = [];

    for (let i = 0; i < 250; i++) {
      const randomWord =
        activePool[Math.floor(Math.random() * activePool.length)];
      shuffled.push({
        word: randomWord,
        typed: "",
        status: "untyped",
      });
    }

    setWords(shuffled);
    setCurrentWordIdx(0);
    setCurrentInput("");
    setTimeLeft(60);
    setIsActive(false);
    setIsCompleted(false);
    setStats({
      correctChars: 0,
      wrongChars: 0,
      correctWordsCount: 0,
      wrongWordsCount: 0,
      wrongWordsList: [],
    });

    if (timerRef.current) clearInterval(timerRef.current);
    if (wordsContainerRef.current) {
      wordsContainerRef.current.scrollTop = 0;
    }
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  // Tab / Tab+Enter shortcut for Instant Reset
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if (e.key === "Tab") {
        e.preventDefault();
        initTest(problemWords.length > 0 ? problemWords : DEFAULT_POLISH_WORDS);
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [problemWords]);

  // line scrolling logic
  useEffect(() => {
    if (activeWordRef.current && wordsContainerRef.current) {
      const activeEl = activeWordRef.current;
      const container = wordsContainerRef.current;

      const relativeTop = activeEl.offsetTop - container.offsetTop;

      if (relativeTop > 40) {
        container.scrollTo({
          top: activeEl.offsetTop - container.offsetTop - 10,
          behavior: "smooth",
        });
      } else if (relativeTop <= 10) {
        container.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [currentWordIdx]);

  // countdown timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  function finishTest() {
    setIsActive(false);
    setIsCompleted(true);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;

    if (!isActive && !isCompleted && val.length > 0) {
      setIsActive(true);
    }

    // space key triggers word submission
    if (val.endsWith(" ")) {
      const trimmedInput = val.trim();
      const targetWord = words[currentWordIdx]?.word || "";

      const isCorrect = trimmedInput === targetWord;
      const newStatus = isCorrect ? "correct" : "wrong";

      let correctCharsInWord = 0;
      let wrongCharsInWord = 0;

      for (let i = 0; i < targetWord.length; i++) {
        if (trimmedInput[i] === targetWord[i]) {
          correctCharsInWord++;
        } else {
          wrongCharsInWord++;
        }
      }
      if (trimmedInput.length > targetWord.length) {
        wrongCharsInWord += trimmedInput.length - targetWord.length;
      }
      if (isCorrect) {
        correctCharsInWord += 1;
      } else {
        wrongCharsInWord += 1;
      }

      setWords((prev) => {
        const updated = [...prev];
        updated[currentWordIdx] = {
          ...updated[currentWordIdx],
          typed: trimmedInput,
          status: newStatus,
        };
        return updated;
      });

      setStats((prev) => ({
        correctChars: prev.correctChars + correctCharsInWord,
        wrongChars: prev.wrongChars + wrongCharsInWord,
        correctWordsCount: prev.correctWordsCount + (isCorrect ? 1 : 0),
        wrongWordsCount: prev.wrongWordsCount + (isCorrect ? 0 : 1),
        wrongWordsList: isCorrect
          ? prev.wrongWordsList
          : Array.from(new Set([...prev.wrongWordsList, targetWord])),
      }));

      setCurrentWordIdx((prev) => prev + 1);
      setCurrentInput("");
    } else {
      setCurrentInput(val);
    }
  }

  const overallWpm = Math.round(
    stats.correctChars / 5 / (Math.max(1, 60 - timeLeft) / 60),
  );
  const totalKeystrokes = stats.correctChars + stats.wrongChars;
  const accuracy =
    totalKeystrokes > 0
      ? Math.round((stats.correctChars / totalKeystrokes) * 100)
      : 100;
  const accuracyDisplay = totalKeystrokes > 0 ? `${accuracy}%` : "--%";

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  return (
    <main className="mx-auto mb-16 mt-10 bg-background px-6 md:px-12 transition-colors duration-300 z-0">
      <div className="max-w-4xl mx-auto space-y-8">
        <div
          className="space-y-4 animate-in slide-in-from-bottom-8 fade-in duration-700"
          style={{ animationFillMode: "both" }}
        >
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              asChild
              className="-ml-4 text-muted-foreground"
            >
              <Link href="/misc">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Misc
              </Link>
            </Button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-jetbrains tracking-tight">
            Typing<span className="text-muted-foreground">/Benchmark</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            60-second typing test calibrated for <i>me</i> to train my personal
            problem words.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border/50 bg-card">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-jetbrains font-bold text-2xl tracking-tight">
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="flex items-center gap-2 border-l border-border/40 pl-6">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="font-jetbrains font-bold text-2xl tracking-tight">
                {overallWpm}{" "}
                <span className="text-xs font-normal text-muted-foreground uppercase">
                  WPM
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 border-l border-border/40 pl-6 hidden sm:flex">
              <Trophy className="h-4 w-4 text-emerald-500" />
              <span className="font-jetbrains font-bold text-xl tracking-tight">
                {accuracyDisplay}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              initTest(
                problemWords.length > 0 ? problemWords : DEFAULT_POLISH_WORDS,
              )
            }
            className="font-jetbrains text-xs"
            title="Press Tab to reset test instantly"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset (Tab)
          </Button>
        </div>

        <Progress value={((60 - timeLeft) / 60) * 100} className="h-1.5" />

        {!isCompleted ? (
          <Card
            className="p-6 cursor-text border-border/60 hover:border-border transition-colors relative"
            onClick={() => inputRef.current?.focus()}
          >
            <div
              ref={wordsContainerRef}
              className="font-jetbrains text-xl md:text-2xl leading-relaxed flex flex-wrap gap-x-3 gap-y-2 select-none h-32 overflow-hidden items-start scroll-smooth"
            >
              {words.map((w, idx) => {
                const isCurrent = idx === currentWordIdx;
                const isPast = idx < currentWordIdx;

                if (isCurrent) {
                  const targetChars = w.word.split("");
                  const typedChars = currentInput.split("");

                  return (
                    <span
                      key={idx}
                      ref={activeWordRef}
                      className="inline-block relative"
                    >
                      {targetChars.map((char, charIdx) => {
                        const typedChar = typedChars[charIdx];
                        let charClass = "text-zinc-500"; // untyped characters

                        if (typedChar !== undefined) {
                          charClass =
                            typedChar === char
                              ? "text-white font-semibold"
                              : "text-red-500 bg-red-500/20 underline decoration-red-500";
                        }

                        return (
                          <span key={charIdx} className={charClass}>
                            {char}
                          </span>
                        );
                      })}
                      {typedChars.length > targetChars.length &&
                        typedChars
                          .slice(targetChars.length)
                          .map((extraChar, extraIdx) => (
                            <span
                              key={extraIdx}
                              className="text-red-500 bg-red-500/30 underline decoration-red-500"
                            >
                              {extraChar}
                            </span>
                          ))}
                    </span>
                  );
                }

                if (isPast) {
                  return (
                    <span
                      key={idx}
                      className={
                        w.status === "correct"
                          ? "text-emerald-500"
                          : "text-red-500 line-through decoration-red-500/60"
                      }
                    >
                      {w.word}
                    </span>
                  );
                }

                return (
                  <span key={idx} className="text-zinc-500">
                    {w.word}
                  </span>
                );
              })}
            </div>

            <div className="mt-4">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                disabled={isCompleted}
                placeholder={
                  isActive ? "" : "Click or press any key to start typing..."
                }
                className="w-full bg-muted/40 border border-border/60 rounded-lg px-4 py-3 font-jetbrains text-lg focus:outline-none focus:border-primary transition-colors text-foreground"
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          </Card>
        ) : (
          /* final results */
          <Card className="p-8 border-primary/10 animate-in zoom-in-95 duration-500">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="font-jetbrains text-xs gap-1 text-primary"
                >
                  Test Completed
                </Badge>
              </div>
              <CardTitle className="font-jetbrains text-3xl mt-2">
                Results Summary
              </CardTitle>
              <CardDescription>
                Here is performance breakdown on the word set.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-muted/40 border border-border/40 text-center">
                  <span className="text-xs font-jetbrains text-muted-foreground uppercase">
                    WPM
                  </span>
                  <p className="text-3xl font-bold font-jetbrains text-primary mt-1">
                    {overallWpm}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/40 border border-border/40 text-center">
                  <span className="text-xs font-jetbrains text-muted-foreground uppercase">
                    Accuracy
                  </span>
                  <p className="text-3xl font-bold font-jetbrains text-emerald-500 mt-1">
                    {accuracy}%
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/40 border border-border/40 text-center">
                  <span className="text-xs font-jetbrains text-muted-foreground uppercase">
                    Keystrokes
                  </span>
                  <p className="text-lg font-bold font-jetbrains text-foreground mt-2">
                    <span className="text-emerald-500">
                      {stats.correctChars}
                    </span>{" "}
                    / <span className="text-red-500">{stats.wrongChars}</span>
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/40 border border-border/40 text-center">
                  <span className="text-xs font-jetbrains text-muted-foreground uppercase">
                    Correct Words
                  </span>
                  <p className="text-3xl font-bold font-jetbrains text-foreground mt-1">
                    {stats.correctWordsCount}
                  </p>
                </div>
              </div>

              {stats.wrongWordsList.length > 0 ? (
                <div className="space-y-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                  <div className="flex items-center gap-2 text-red-500 text-sm font-semibold font-jetbrains">
                    <XCircle className="h-4 w-4" />
                    <span>
                      Words to practice ({stats.wrongWordsList.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {stats.wrongWordsList.map((w, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="font-jetbrains text-xs border-red-500/30 text-red-400 bg-red-500/10"
                      >
                        {w}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-2 text-emerald-500 text-sm font-jetbrains">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Flawless run! Zero missed words.</span>
                </div>
              )}

              <div className="pt-2">
                <Button
                  onClick={() =>
                    initTest(
                      problemWords.length > 0
                        ? problemWords
                        : DEFAULT_POLISH_WORDS,
                    )
                  }
                  className="w-full font-jetbrains"
                  size="lg"
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Try Again (Tab)
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
