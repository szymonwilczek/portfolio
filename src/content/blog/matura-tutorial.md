---
title: "Reverse Engineering the Matura Exam"
excerpt: "A programmer's deep dive into passing the Polish Matura in Mathematics. Stop memorizing, start thinking algorithmically."
date: "2026-04-30"
tags:
  - "Math"
  - "Education"
  - "Guide"
font: "merriweather"
github: "https://github.com/wolfie-university/maturator"
links:
  - url: "https://maturator.vercel.app"
    name: "Practice on Maturator"
---

> **Article below is in Polish language, since the Matura Exam is being held in Poland.** \
This article purposely uses different font, to be more pleasant during reading.

---

> Matematyka na poziomie podstawowym to nie jest test na bycie geniuszem. To test sprawdzający, czy potrafisz podążać za procedurami, czytać dokumentację ze zrozumieniem i nie panikować, gdy zobaczysz ciąg znaków wyglądający jak zaszyfrowany klucz.

Jako programista i korepetytor powiem wam jedno: **przestańcie ryć na blachę, zacznijcie myśleć jak inżynierowie.** Egzamin maturalny to po prostu zbiór problemów do rozwiązania. Każde zadanie to funkcja, gdzie podano wam parametry wejściowe, a Wy musicie zwrócić konkretny `output`, korzystając z dostępnej dokumentacji.

CKE wydało obszerny *Informator* na nowe lata szkolne. Z perspektywy dewelopera to nic innego jak **oficjalna specyfikacja wymagań technicznych**. Tą biblioteką, do której macie legalny dostęp podczas egzaminu, są *"Wybrane wzory matematyczne"*. Zamiast wkuwać, nauczymy się z niej korzystać. 

Podzieliłem ten przewodnik na moduły odpowiadające oficjalnemu spisowi treści z tablic CKE.

---

## Wstęp: Dlaczego faktycznie się to oblewa?

Przypominam, to test sprawdzający tak naprawdę trzy rzeczy:

1. Czy potrafisz **parsować** dane z zadania (czytać wykresy, rozumieć dziedziny)
2. Czy znasz **algorytmy** - procedury, które zawsze działają na danej klasie problemów
3. Czy nie wpadniesz w **pułapki** - te same *honeypoty*, które CKE ustawia rok po roku

> **Ważna notatka na typ poziomie**: Nie traktuj arkusza maturalnego jako testu, który chce cię oszukać. On jedynie sprawdza Twoją wiedzę. Z perspektywy czysto filozoficznej, kartka papieru nie posiada tyle zdolności poznawczych, żeby oszukać najbardziej rozwinięty gatunek w przyrodzie.

Uczniowie nie zdają, bo uczą się matematyki jak biologii - zapamiętują schematy dla konkretnych liczb. Patrząc na to czysto matematycznie: **Nie ma nic gorszego**. \
CKE daje Ci podczas egzaminu broszurę *"Wybrane wzory matematyczne"*. To nie jest formalność. To jest Twoja **dokumentacja**. Naucz się, co tam jest i jak z tego korzystać.

Arkusz maturalny to około `50` punktów w `180` minut = `3,6` minuty na punkt. Zadania 1-puntktowe powinny Ci zajmować **45-90 sekund**. \
Czasu jest dostatecznie dużo na przeczytanie polecenia zadania i podejścia do niego korzystając z co najmniej paru sposobów. Najważniejsze: **próbować**. Nie można stać w miejscu. Próbować, próbować i próbować. Od tyłu, od przodu, od boku - **próbować**.

---

## Moduł 1: Wartość Bezwzględna

### Czym to jest naprawdę?

Wartość bezwzględna $|x|$ to funkcja dystansu. Mierzy, jak daleko liczba jest od zera na osi liczbowej. 

$|-5| = 5$, bo $-5$ leży `5` jednostek od zera. $|3| = 3$, bo $3$ leży `3` jednostki od zera.

Formalnie:
$$|x| = \begin{cases} x & \text{gdy } x \geq 0 \\ -x & \text{gdy } x < 0 \end{cases}$$

Inaczej mówiąc: 
- jeśli *"wnętrze"* jest dodatnie, ściągasz moduł **bez zmian**.
- jeśli *"wnętrze"* jest ujemne, **odwracasz znak**.

### Algorytm - zawsze ten sam

1. Sprawdź, czy wyrażenie pod modułem jest dodatnie czy ujemne. Zrób to przez **podstawienie przybliżonej wartości**.
2. Jeśli dodatnie $\rightarrow$ ściągnij moduł bez zmian. Jeśli ujemne $\rightarrow$ odwróć znaki.
3. Uprość wynik algebraicznie.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 1

$$|\sqrt{5} - 3| + |\sqrt{5} - 1|$$

$\sqrt{4} = 2$, $\sqrt{9} = 3$, więc $\sqrt{5}$ to trochę więcej niż 2, mniej niż 3 ($\approx 2{,}24$).

- Pierwszy czynnik: $\sqrt{5} - 3 \approx 2{,}24 - 3 = -0{,}76$ $\rightarrow$ **ujemne** $\rightarrow$ odwracamy znaki
- Drugi czynnik: $\sqrt{5} - 1 \approx 2{,}24 - 1 = 1{,}24$ $\rightarrow$ **dodatnie** $\rightarrow$ zostawiamy

$$|{-0{,}76}| \to -({\sqrt{5} - 3}) = -\sqrt{5} + 3 = 3 - \sqrt{5}$$

$$|{1{,}24}| \to \sqrt{5} - 1$$

$$(3 - \sqrt{5}) + (\sqrt{5} - 1) = 3 - \sqrt{5} + \sqrt{5} - 1 = \boxed{2}$$

Szybko i bez kalkulatora.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Informator CKE

$$|\sqrt{5} - 1| - 3|2 - \sqrt{5}|$$

$\sqrt{5} \approx 2{,}24$:
- $\sqrt{5} - 1 \approx 1{,}24$ $\rightarrow$ **dodatnie** $\rightarrow$ $\sqrt{5} - 1$
- $2 - \sqrt{5} \approx -0{,}24$ $\rightarrow$ **ujemne** $\rightarrow$ moduł zwraca $-(2 - \sqrt{5}) = -2 + \sqrt{5} = \sqrt{5} - 2$

$$(\sqrt{5} - 1) - 3(\sqrt{5} - 2) = \sqrt{5} - 1 - 3\sqrt{5} + 6 = \boxed{5 - 2\sqrt{5}}$$

---

## Moduł 2: Potęgi i Pierwiastki

### Filozofia

Potęgi i pierwiastki to z programistycznego żargonu **transformacje typów**. Możesz je swobodnie dodawać, odejmować, mnożyć TYLKO jeśli mają ten sam ***"typ"*** - tę samą podstawę.

$$3^2 \cdot 3^5 = 3^7 \quad \checkmark$$

$$3^2 \cdot 5^3 = \text{?} \quad \text{(różne typy, nie łącz!)}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Cztery reguły, które załatwiają wszystko

$$
\def\arraystretch{1.5}
\begin{array}{|l|c|c|}
\hline
\textbf{Operacja} & \textbf{Wzór} & \textbf{Przykład} \\
\hline
\text{Mnożenie tych samych podstaw} & a^m \cdot a^n = a^{m+n} & 2^3 \cdot 2^4 = 2^7 \\
\hline
\text{Dzielenie tych samych podstaw} & \frac{a^m}{a^n} = a^{m-n} & \frac{5^7}{5^3} = 5^4 \\
\hline
\text{Potęga potęgi} & (a^m)^n = a^{m \cdot n} & (3^2)^5 = 3^{10} \\
\hline
\text{Ujemny wykładnik} & a^{-n} = \frac{1}{a^n} & 2^{-3} = \frac{1}{8} \\
\hline
\end{array}
$$

Plus dwie z pierwiastków:
- $\sqrt[n]{a} = a^{1/n}$
- $\sqrt[n]{a \cdot b} = \sqrt[n]{a} \cdot \sqrt[n]{b}$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Próbna Marzec 2026, Zadanie 3

$$\frac{3^{10} \cdot 9^{20}}{27^{15}}$$

**Refaktoryzacja do bazy 3:**
- $9 = 3^2$, więc $9^{20} = (3^2)^{20} = 3^{40}$
- $27 = 3^3$, więc $27^{15} = (3^3)^{15} = 3^{45}$

$$\frac{3^{10} \cdot 3^{40}}{3^{45}} = \frac{3^{50}}{3^{45}} = 3^{50-45} = \boxed{3^5 = 243}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 2

$$\frac{25^{-2}}{125^{-4}}$$

**Refaktoryzacja do bazy 5:**
- $25 = 5^2$, więc $25^{-2} = (5^2)^{-2} = 5^{-4}$
- $125 = 5^3$, więc $125^{-4} = (5^3)^{-4} = 5^{-12}$

$$\frac{5^{-4}}{5^{-12}} = 5^{-4-(-12)} = 5^{-4+12} = \boxed{5^8}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 3

$$\sqrt[3]{24} + \sqrt[3]{192}$$

**Algorytm:** Szukaj "idealnej kostki" w środku.
- $24 = 8 \cdot 3 = 2^3 \cdot 3$, więc $\sqrt[3]{24} = \sqrt[3]{2^3 \cdot 3} = 2\sqrt[3]{3}$
- $192 = 64 \cdot 3 = 4^3 \cdot 3$, więc $\sqrt[3]{192} = \sqrt[3]{4^3 \cdot 3} = 4\sqrt[3]{3}$

$$2\sqrt[3]{3} + 4\sqrt[3]{3} = (2+4)\sqrt[3]{3} = \boxed{6\sqrt[3]{3}}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 2

$$\frac{5^{12} + 5^{13} + 5^{14}}{5^{12}}$$

**Wyciągnij $5^{12}$ z licznika**. Dlaczego? **Zawsze** szukaj ile da się najwięcej wyciągnąć przed wspólny nawias. Słyszałem kiedyś, że matematyka jest rasistowska, może i to prawda, więc generalizuj jak możesz, a żeby robić to skutecznie - wyciągaj przed nawias.

Programiści mają zasadę `DRY` - *Don't Repeat Yourself*. Matematycy też. Jeśli widzisz ułamek wypchany po brzegi wielkimi potęgami, to nie odpalaj w głowie w zapętleniu tego potęgowania. Mózg Ci będzie parować. Skompresuj dane. Zawsze szukaj **najmniejszego wspólnego elementu** i wyciągnij go przed nawias. To jak zrobienie z 3 grubych zmiennych jednej lekkiej referencji.

$$\frac{5^{12}(1 + 5 + 5^2)}{5^{12}} = 1 + 5 + 25 = \boxed{31}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Do zapamiętania
#### Idealne sześciany
$8 = 2^3$, $27 = 3^3$, $64 = 4^3$, $125 = 5^3$

#### Idealne kwadraty
$4, 9, 16, 25, 36, 49, 64, 81, 100$

---

## Moduł 3: Logarytmy

### Czym to jest?

$\log_a b = c$ pyta: **do jakiej potęgi $c$ podnieść $a$, żeby dostać $b$?**

- $$\log_2 8 = 3 \quad \text{bo} \quad 2^3 = 8$$
- $$\log_3 81 = 4 \quad \text{bo} \quad 3^4 = 81$$
- $$\log_5 1 = 0 \quad \text{bo} \quad 5^0 = 1$$
- $$\log_{10} 0{,}01 = -2 \quad \text{bo} \quad 10^{-2} = 0{,}01$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Cztery wzory z tablicy — Twoja biblioteka standardowa

- $$\log_a(x \cdot y) = \log_a x + \log_a y$$
- $$\log_a\frac{x}{y} = \log_a x - \log_a y$$
- $$\log_a x^n = n \cdot \log_a x$$
- $$\log_a a = 1, \quad \log_a 1 = 0$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Algorytm dla zadań z logarytmami

1. **Usuń współczynniki** - wciągnij je do potęgi: $2\log_3 x = \log_3 x^2$
2. **Zamień sumy/różnice na iloraz/iloczyn** - użyj wzorów powyżej
3. **Uproszczone wyrażenie oceń wprost**

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 3

$$\log_3 108 - 2\log_3 2$$

**Krok 1:** Wciągnij 2 do potęgi: $2\log_3 2 = \log_3 2^2 = \log_3 4$

**Krok 2:** Różnica logarytmów to logarytm ilorazu:
$$\log_3 108 - \log_3 4 = \log_3 \frac{108}{4} = \log_3 27$$

**Krok 3:** Odpytaj bazę: $3^? = 27 = 3^3$, więc wynik $= \boxed{3}$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 4

$$\log_3 2 - \log_3 18$$

Różnica logarytmów:
$$\log_3 \frac{2}{18} = \log_3 \frac{1}{9} = \log_3 3^{-2} = \boxed{-2}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Matura Próbna Marzec 2026, Zadanie 4

$$\log_8 \sqrt[5]{2}$$

**Zamień wszystko na potęgi dwójki:**
- $\sqrt[5]{2} = 2^{\frac{1}{5}}$
- $8 = 2^3$

Pytamy: $(2^3)^x = 2^{\frac{1}{5}}$, czyli $3 \cdot x = \frac{1}{5}$, więc $x = \frac{1}{15}$.

Formalnie: $\log_8 \sqrt[5]{2} = \log_{2^3} 2^{\frac{1}{5}} = \frac{\frac{1}{5}}{3} = \frac{1}{15}$

Korzystamy ze wzoru $\log_{a^k} a^n = \frac{n}{k}$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Zwróć uwagę! 

`❌ BŁĄD`: Uczeń liczy $\log_3 108 - 2\log_3 2$ jako $\log_3(108 - 2 \cdot 2) = \log_3 104$. 

> **Logarytmy NIE są liniowe.** Wzory działają tylko dla mnożenia/dzielenia pod logarytmem.

---

## Moduł 4: Wzory Skróconego Mnożenia

### Trzy wzory, które musisz znać na pamięć

- $$(a+b)^2 = a^2 + 2ab + b^2$$
- $$(a-b)^2 = a^2 - 2ab + b^2$$
- $$(a+b)(a-b) = a^2 - b^2$$

Oraz *"w drugą stronę"* (faktoryzacja):

$$a^2 - b^2 = (a+b)(a-b)$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 6

$$(3x + y)^2 - (3x - y)^2$$

**Rozpoznaj wzór:** To jest $(a + b)^2 - (a - b)^2$ dla $a = 3x$, $b = y$.

Rozwiń oba:
- $(3x+y)^2 = 9x^2 + 6xy + y^2$
- $(3x-y)^2 = 9x^2 - 6xy + y^2$

Odejmij:

$$(9x^2 + 6xy + y^2) - (9x^2 - 6xy + y^2) = \boxed{12xy}$$

#### Protip:

$$\boxed{ \begin{array}{c} \text{Jest szybszy wzór ogólnie:} \\\\ (a+b)^2 - (a-b)^2 = 4ab \\\\ \text{Zawsze.} \end{array} }$$

Sprawdź sobie: \
$4 \cdot 3x \cdot y = \boxed{12xy}$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 4

$$(3x + 2)^2 - (2x - 3)^2$$

Rozwiń:
- $(3x+2)^2 = 9x^2 + 12x + 4$
- $(2x-3)^2 = 4x^2 - 12x + 9$

Odejmij (uważaj na minus!):

$$9x^2 + 12x + 4 - 4x^2 + 12x - 9 = 5x^2 + 24x - 5$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 5

**"Wykaż, że $8^{50} - 2^{145}$ jest podzielna przez 31."**

Zamień $8 = 2^3$:

$$8^{50} = (2^3)^{50} = 2^{150}$$

Wyciągnij mniejszą potęgę przed nawias:

$$2^{150} - 2^{145} = 2^{145}(2^5 - 1) = 2^{145} \cdot (32 - 1) = 2^{145} \cdot 31$$

**Konkluzja:** wyrażenie to $31 \cdot 2^{145}$, które jest wielokrotnością 31. `c.k.d` 
> (lub `c.n.d` lub `zamalowany kwadrat` - obojętnie)

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Matura Próbna Marzec 2026, Zadanie 5

**"Wykaż, że $2501^4 - 2499^4$ jest podzielna przez 10000."**

Użyj wzoru $a^2 - b^2 = (a+b)(a-b)$ **dwa razy**:

$a = 2501^2$, $b = 2499^2$:

$$2501^4 - 2499^4 = (2501^2 + 2499^2)(2501^2 - 2499^2)$$

Teraz na drugi czynnik znowu zastosuj wzór ($a = 2501$, $b = 2499$):

$$2501^2 - 2499^2 = (2501+2499)(2501-2499) = 5000 \cdot 2 = 10000$$

Zatem całe wyrażenie $= (2501^2 + 2499^2) \cdot 10000$ jest podzielne przez 10000 `c.n.d`.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

Zadania typu *Wykaż, że ...* (tzw. dowody) programista traktuje jak Testy Jednostkowe. Znasz `Expected Output` (np. że liczba dzieli się przez 31). Twoim zadaniem jest przepisać tylko funkcję wejściową za pomocą wzorów skróconego mnożenia tak, żeby test zaświecił się na zielono (czyli żeby pojawiła się liczba 31 przed nawiasem). Nie wymyślasz koła na nowo, robisz refaktoryzację. Masz przepis, jesteś kucharzem, nie eksperymentujesz.

---

## Moduł 5: Równania i Nierówności Liniowe

### Nierówności liniowe - prosty algorytm

1. $x$ na lewo, liczby na prawo (*klasyka*)
2. Uprość
3. **UWAGA:** Mnożąc/dzieląc przez liczbę ujemną, **odwracasz znak nierówności**
4. Zawsze narysuj oś! 

Uświadom sobie, że $x \leq -5$ oznacza przedział $\left( - \infty, -5 \right>$. W zadaniach zamkniętych CKE często daje dwa wykresy "lecące" w prawo i dwa w lewo. Odrzucenie 50% złych opcji zajmuje jedną sekundę.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 6

$$3 - 2(1 - 2x) \geq 2x - 17$$

**1.** Rozwiń nawias:

$$3 - 2 + 4x \geq 2x - 17$$ \
$$1 + 4x \geq 2x - 17$$

**2.** Przenieś:

$$4x - 2x \geq -17 - 1$$ \
$$2x \geq -18$$ \
$$x \geq -9$$

Zbiór rozwiązań: $[-9, +\infty)$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 7

$$3 - x \geq \frac{5x - 1}{2}$$

Pomnóż obie strony przez 2:

$$6 - 2x \geq 5x - 1$$ \
$$7 \geq 7x$$ \
$$1 \geq x \quad \text{to to samo co:} \quad x \leq 1$$

Zbiór: $(-\infty, 1]$

---

### Układy równań liniowych

Zawsze masz dwie metody (choć istnieje znacznie więcej, ale te się sprawdzają najbardziej u maturzystów): podstawiania i przeciwnych współczynników.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 9

Dwie grupy A i B dostają łącznie 1 200 000 zł. Razem wydały 146 700 zł - A wydało 13% swojej kwoty, B wydało 11%.

Niech $a$ = kwota A, $b$ = kwota B.

Układ:

$$\begin{cases} a + b = 1\,200\,000 \\ 0{,}13a + 0{,}11b = 146\,700 \end{cases}$$

Z pierwszego, wynika że: 
$b = 1\,200\,000 - a$.

Podstawiamy do drugiego:

$0{,}13a + 0{,}11(1\,200\,000 - a) = 146\,700$ \
$0{,}13a + 132\,000 - 0{,}11a = 146\,700$ \
$0{,}02a = 14\,700$ \
$a = 735\,000$

Kwota zespołu A wynosi **735 000 zł**.

---

## Moduł 6: Równania i Nierówności Kwadratowe

### Nierówność kwadratowa - algorytm wizualny

Dla $ax^2 + bx + c \lessgtr 0$:

1. Znajdź miejsca zerowe (delta - chociaż ja wolę, *wyróżnik trójmianu kwadratowego*)
2. Narysuj parabolę (czy jest "uśmiechnięta" $a>0$ czy "smutna" $a<0$ ?)
3. Odczytaj rozwiązanie z wykresu

> Te śmieszne znaczki ($\lessgtr$) oznaczają, że jestem leniwy. Zamiast pisać osobno dwa równania (jedno dla $< 0$, drugie dla $> 0$), napisałem to w jednym równaniu.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 1

$$3(2x^2 + 1) < 11x$$ \
$$6x^2 + 3 < 11x$$ \
$$6x^2 - 11x + 3 < 0$$

$\Delta = 121 - 72 = 49$, $\sqrt{\Delta} = 7$

Pierwiastki: $x = \frac{11 \pm 7}{12}$ \
$x_1 = \frac{4}{12} = \frac{1}{3}$ \
$x_2 = \frac{18}{12} = \frac{3}{2}$

Parabola "uśmiechnięta" ($a=6>0$), więc $< 0$ **między pierwiastkami**: \
$$x \in \left(\frac{1}{3}, \frac{3}{2}\right)$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 9

$$-3x^2 > 6x - 9$$ \
$$-3x^2 - 6x + 9 > 0$$

Podziel przez $-3$ (odwróć nierówność!):

$$x^2 + 2x - 3 < 0$$

$\Delta = 4 + 12 = 16$, $\sqrt{\Delta} = 4$

Pierwiastki: $x = \frac{-2 \pm 4}{2}$ \
$x_1 = -3$, $x_2 = 1$

Parabola "uśmiechnięta": \
$$x \in (-3, 1)$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Próbna Marzec 2026, Zadanie 8

$$(x-3)(x+5) > 9$$ \
$$x^2 + 2x - 15 > 9$$ \
$$x^2 + 2x - 24 > 0$$

$\Delta = 4 + 96 = 100$, $\sqrt{\Delta} = 10$

Pierwiastki: $x = \frac{-2 \pm 10}{2}$ \
$x_1 = -6$, $x_2 = 4$

Parabola "uśmiechnięta": \
$$x \in (-\infty, -6) \cup (4, +\infty)$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Znajdowanie pierwiastków wielomianu wyższego stopni: Maj 2025, Zadanie 7

$$2x(x+3)(x^2+25) = 0$$

Zasada: iloczyn jest zerem, gdy **co najmniej jeden** czynnik jest zerem.

- $2x = 0 \Rightarrow x = 0$
- $x + 3 = 0 \Rightarrow x = -3$
- $x^2 + 25 = 0 \Rightarrow x^2 = -25$ - **brak rozwiązań rzeczywistych!** (kwadrat liczby rzeczywistej nie może być ujemny)

Czyli mamy **dwa** rozwiązania: $0$ i $-3$.

> **Czerwona flaga:** Gdy widzisz $x^2 + c$ dla $c > 0$ - to czynnik bez pierwiastków rzeczywistych. CKE często go wstawia, żeby sprawdzić, czy wiesz, że go pominąć. Nie da się podnieść liczby rzeczywistej do kwadratu i dostać ujemny wynik. To jest taki *honeypot* na uczniów, którzy bezmyślnie przyrównują każdy nawias po kolei. Myśl co robisz.

---

## Moduł 7: Funkcja Kwadratowa

Półmetek artykułu. Masz herbatę/kawę?

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Trzy postaci i kiedy używać której

**Postać ogólna:** $f(x) = ax^2 + bx + c$
- Łatwo wyliczyć $c$ (wartość dla $x=0$)
- Do wyznaczenia wierzchołka potrzeba wzoru $p = \frac{-b}{2a}$

**Postać kanoniczna:** $f(x) = a(x - p)^2 + q$
- Wierzchołek widać wprost: $W(p, q)$

**Postać iloczynowa:** $f(x) = a(x - x_1)(x - x_2)$
- Miejsca zerowe widać wprost: $x_1, x_2$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Wierzchołek i ekstremum - błyskawicznie

Gdy funkcja jest w **postaci kanonicznej** $f(x) = a(x-p)^2 + q$:
- Wierzchołek: $W(p, q)$ - **czytasz bezpośrednio**
- $a > 0$: parabola "uśmiechnięta", wierzchołek to **minimum**
- $a < 0$: parabola "smutna", wierzchołek to **maksimum**

> Niesamowicie przydatne przy zadaniach `optymalizacyjnych`.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Matura Próbna Marzec 2026, Zadanie 32.1

$$f(x) = -5(x - \pi)^2 + \sqrt{2}$$

Liczby nas na razie nie interesują (tak, $\pi$ też liczba). Mamy postać kanoniczną, więc: \
Wierzchołek: $W(\pi, \sqrt{2})$. Parabola smutna ($a = -5 < 0$) - maximum w wierzchołku.

Pytanie: wartość największa na $[0, 6]$ to?

$\pi \approx 3{,}14$ - leży w przedziale $[0, 6]$!

Funkcja osiąga maximum dla $x = \pi$.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład - wyznaczanie postaci kanonicznej: Maj 2025, Zadanie 12.1

Wierzchołek $W(3, 6)$, parabola przechodzi przez $(0, 3)$. \
Postać kanoniczna: $f(x) = a(x-3)^2 + 6$

Podstaw $(0, 3)$:

$$3 = a(0-3)^2 + 6 = 9a + 6$$ \
$$9a = -3$$ \
$$a = -\frac{1}{3}$$

Wynik: $f(x) = -\frac{1}{3}(x-3)^2 + 6$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład 3 - miejsca zerowe funkcji przesunięt: Maj 2025, Zadanie 12.3

Skoro $f(x) = -\frac{1}{3}(x-3)^2 + 6$, to: \
$g(x) = f(x) - 3 = -\frac{1}{3}(x-3)^2 + 3$.

Szukamy $x_1 + x_2$ dla zer $g$.

Parabola jest symetryczna względem $x = p = 3$. 

Obydwa pierwiastki leżą symetrycznie względem $x=3$, więc ich suma to $2 \cdot 3 = \boxed{6}$.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład 4 - zadanie hotelo: Sierpień 2025, Zadanie 31 i Informator

$$P(x) = (80-x)(120+5x), \quad 0 \leq x \leq 80$$ \
Pytanie: dla jakiego $x$, $P$ jest największe? I jaka wtedy jest **cena pokoju**?

**Krok 1:** Rozwiń:

$$P(x) = 9600 + 400x - 120x - 5x^2 = -5x^2 + 280x + 9600$$

**Krok 2:** Znajdź wierzchołek. Parabola smutna ($a = -5$), maximum w:

$$p = -\frac{b}{2a} = -\frac{280}{2 \cdot (-5)} = -\frac{280}{-10} = 28$$

**Krok 3:** Sprawdź, czy $p = 28$ leży w dziedzinie $[0, 80]$. Tak.

**Krok 4 - UWAGA:** Pytanie NIE pyta o $x$. Pyta o **cenę pokoju**. Cena pokoju to $120 + 5x$:

$$120 + 5 \cdot 28 = 120 + 140 = \boxed{260 \text{ zł}}$$

To jest czyste zadanie z *Machine Learningu* (ang. uczenie maszynowe - stąd się wziął słynny ChatGPT) na poziomie przedszkolaka tak naprawdę. Masz funkcję kosztu/zysku i szukasz lokalnego ekstremum (jest dużo metod, nie będę wam głowy zaprzątać - dla ciekawych proponuję wyszukać *Gradient Ascent* - ale my mamy gotowy wzór na wierzchołek paraboli). Pamiętaj o jednym: jeśli funkcja zwraca argument `p`, to jest to np. (tak jak tutaj) ilość podwyżek, a nie sama cena! Zawsze zwaliduj (sprawdź) swój końcowy wynik i upewnij się, co masz w ogóle zwrócić na froncie. Zwrócenie ilości podwyżek zamiast ich ceny, to jak wypisanie numeru telefonu od kolegi, któremu macie zrobić BLIKa, bez faktycznego zrobienia tego BLIKa.

---

## Moduł 8: Funkcja Liniowa

### Wzór i interpretacja

$$f(x) = ax + b$$

- $a$ - współczynnik kierunkowy (nachylenie)
  - $a > 0$: funkcja rosnąca
  - $a < 0$: funkcja malejąca
  - $a = 0$: funkcja stała
- $b$ - wyraz wolny ($f(0) = b$, przecięcie z osią Y)

**Miejsce zerowe:** $x_0 = \frac{-b}{a}$ (gdy $a \neq 0$)

Gdy $a = 0$ (funkcja stała): **brak miejsca zerowego**, chyba że $b = 0$.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 1

$f(x) = (3-m)x - 4$

#### Funkcja nie ma miejsca zerowego gdy?
Funkcja liniowa nie ma miejsca zerowego tylko gdy jest **stała i różna od zera**, tj. gdy współczynnik przy $x$ wynosi zero:

$$3 - m = 0 \Rightarrow m = 3$$

Dla $m = 3$: $f(x) = -4$ (stała niezerowa)

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Warunki równoległości i prostopadłości prostych

Proste $y = a_1 x + b_1 \quad \text{i} \quad y = a_2 x + b_2$ są:
- **Równoległe** gdy: $a_1 = a_2$ (i $b_1 \neq b_2$)
- **Prostopadłe** gdy: $a_1 \cdot a_2 = -1$
- **Tożsame:** gdy: $a_1 = a_2$ i $b_1 = b_2$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 2

$k: y = (m-2)x + 5$ \
$l: y = -4x + (m+3)$

#### Kiedy są równoległe?

$$m - 2 = -4 \Rightarrow m = -2$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 2

$k: y = (3-m)x + 5$ \
$l: y = (m+3)x - 4$

#### Kiedy są równoległe?

$$3 - m = m + 3 \Rightarrow -2m = 0 \Rightarrow m = 0$$

---

## Moduł 9: Ciągi

Ciągi to `tablice` (żargon programistyczny: `Array`). Arytmetyczny dodaje stały krok, a ciąg geometryczny mnoży.

**UWAGA**: ani jeden z nich nie zaczyna od `0`!

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Ciąg arytmetyczny

**Definicja:** Każdy wyraz różni się od poprzedniego o stałą $r$ (różnicę).

$$a_n = a_1 + (n-1)r$$

**Suma $n$ pierwszych wyrazów:**
$$S_n = \frac{n(a_1 + a_n)}{2}$$

**Własność środka:** $a_k = \frac{a_{k-1} + a_{k+1}}{2}$ - środkowy element to średnia sąsiadów.

Własność środka można zdefiniować również tak samo jak jeden z moich kursantów lubi, nie ma to większego znaczenia, ponieważ są to tylko oznaczenia:

$b = \frac{a+c}{2}$, gdzie:
- $a = a_{k-1}$
- $b = a_{k}$
- $c = a_{k+1}$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Ciąg geometryczny

**Definicja:** Każdy wyraz to poprzedni pomnożony przez stały iloraz $q$.

$$a_n = a_1 \cdot q^{n-1}$$

**Suma $n$ pierwszych wyrazów:** $S_n = a_1 \cdot \frac{1 - q^n}{1-q}$

> Istnieją dwa wzory, w praktyce na podstawie korzysta się zazwyczaj jedynie z tego wyżej.

**Własność środka:** $a_k^2 = a_{k-1} \cdot a_{k+1}$ - środkowy element do kwadratu to iloczyn sąsiadów.

Tutaj również można zdefiniować to tak samo jak mój kursant:

$b^2 = a \cdot c$, gdzie:
- $a = a_{k-1}$
- $b = a_{k}$
- $c = a_{k+1}$


<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 14.1

$a_1 = 2$ \
$a_{n+1} = 2a_n + 1$ \
$a_3 = ?$

$a_1 = 2$ \
$a_2 = 2 \cdot 2 + 1 = 5$ \
$a_3 = 2 \cdot 5 + 1 = \boxed{11}$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 1

$a_1 = 27$ \
$a_2 = 9$ \
Wiadomo, że ciąg jest geometryczny. Ile wynosi $a_4$?

Iloraz: $q = \frac{a_{k+1}}{a_k} = \frac{a_2}{a_1} = \frac{9}{27} = \frac{1}{3}$

$$a_4 = a_1 \cdot q^3 = 27 \cdot \left(\frac{1}{3}\right)^3 = 27 \cdot \frac{1}{27} = \boxed{1}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład - trzywyrazowy ciąg arytmetycz: Maj 2025, Zadanie 15

**"Wyznacz $m$, dla którego $(2m+11, m^2+3, 5-m)$ jest arytmetyczny i malejący."**

**Warunek arytmetyczności:** Środkowy element = średnia sąsiadów.

$$m^2 + 3 = \frac{(2m+11) + (5-m)}{2} = \frac{m + 16}{2}$$

$$2m^2 + 6 = m + 16$$ \
$$2m^2 - m - 10 = 0$$

$\Delta = 1 + 80 = 81 \Rightarrow \sqrt{\Delta} = 9$

$$m = \frac{1 \pm 9}{4}$$, czyli $m = \frac{10}{4} = 2{,}5$ lub $$m = \frac{-8}{4} = -2$$

**Warunek malejący:** $a_1 > a_2$ (różnica ujemna):

$$a_2 - a_1 = (m^2+3) - (2m+11) = m^2 - 2m - 8 < 0$$ \
$$(m-4)(m+2) < 0 \Rightarrow m \in (-2, 4)$$

Które rozwiązanie spełnia warunek:

$m = 2{,}5$ (leży w $(-2, 4)$) \
$m = -2$ ✗ (nie spełnia *ściśle$^1$*)

Wynik: $m = 2{,}5$.

$^1$ Tak to określamy w matematyce, że coś ściśle spełnia, bądź nie spełnia warunku.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Matura Próbna Marzec 2026, Zadanie 1

Ciąg $a_n = \frac{3n+9}{n+1}$. Znajdź $x$ dla których $(a_5, 2x^2, 3x^2+5)$ jest arytmetyczny.

**Krok 1:** Oblicz $a_5$: $a_5 = \frac{3 \cdot 5 + 9}{5+1} = \frac{24}{6} = 4$

**Krok 2:** Warunek arytmetyczności: \
$$2x^2 = \frac{4 + 3x^2+5}{2} = \frac{3x^2+9}{2}$$ \
$$4x^2 = 3x^2 + 9$$ \
$$x^2 = 9$$ \
$$x = 3 \text{ lub } x = -3$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Matura Próbna Marzec 2026, Zadanie 15

$a_1 = 5$, $a_{n+1} = a_n + 2$ (ciąg arytmetyczny, $r = 2$).

$S_{100} = ?$

$a_{100} = 5 + 99 \cdot 2 = 5 + 198 = 203$

$$S_{100} = \frac{100(a_1 + a_{100})}{2} = \frac{100(5 + 203)}{2} = \frac{100 \cdot 208}{2} = 50 \cdot 208 = \boxed{10400}$$

---

## Moduł 10: Trygonometria

### Jedynka trygonometryczna i tożsamości

$$\sin^2 \alpha + \cos^2 \alpha = 1 \quad \text{(zawsze!)}$$ \
$$\tan \alpha = \frac{\sin \alpha}{\cos \alpha}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Znaki funkcji trygonometrycznych wg ćwiartek

- **I ćwiartka** ($0\degree$ - $90\degree$): wszystkie funkcje są dodatnie
- **II ćwiartka** ($90\degree$ - $180\degree$, czyli kąt rozwarty): $\sin > 0$, $\cos < 0$, $\tan < 0$
- **III ćwiartka** ($180\degree$ - $270\degree$): $\sin < 0$, $\cos < 0$, $\tan > 0$
- **IV ćwiartka** ($270\degree$ - $360\degree$): $\sin < 0$, $\cos > 0$, $\tan < 0$

Jest też mnemonik (sposób na pamięć):

```
W pierwszej ćwiartce wszystkie funkcje są dodatnie,
W drugiej tylko sinus,
W trzeciej tangens i cotangens,
W czwartej cosinus
```

> Taki rzekomy "wierszyk", ale chyba *biały*, bo się nie rymuje.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 17

$\sqrt{3} \cdot \tan\alpha = 2\sin\alpha$, \
Kąt $\alpha$ jest ostry - **NIESAMOWICIE** zwracajcie na to uwagę!

Zamień $\tan\alpha = \frac{\sin\alpha}{\cos\alpha}$: \
$$\sqrt{3} \cdot \frac{\sin\alpha}{\cos\alpha} = 2\sin\alpha$$

Podziel obie strony przez $\sin\alpha$ (dla $\alpha$ ostrego $\sin\alpha \neq 0$): \
$$\frac{\sqrt{3}}{\cos\alpha} = 2$$ \
$$\cos\alpha = \frac{\sqrt{3}}{2}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 19

$\cos\alpha = \frac{5}{13}$, a kąt $\alpha$ jest kątem ostrym. \
$tg\alpha = ?$

Z jedynki trygonometrycznej: \
$\sin^2\alpha = 1 - \cos^2\alpha = 1 - \frac{25}{169} = \frac{144}{169}$ \
$\sin\alpha = \frac{12}{13}$ (dodatni, bo $\alpha$ ostry).

$$\tan\alpha = \frac{12/13}{5/13} = \frac{12}{5}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Próbna Marzec 2026, Zadanie 17

Kąt $\alpha$ rozwarty, $\sin\alpha = \frac{1}{\sqrt{3}}$. Oblicz $\frac{3\sin\alpha}{\tan\alpha}$.

**Zamień mianownik:**
$$\frac{3\sin\alpha}{\tan\alpha} = \frac{3\sin\alpha}{\sin\alpha/\cos\alpha} = 3\cos\alpha$$

**Znajdź $\cos\alpha$** przez jedynkę:
$$\cos^2\alpha = 1 - \sin^2\alpha = 1 - \frac{1}{3} = \frac{2}{3}$$

$\alpha$ rozwarty $\rightarrow$ II ćwiartka $\rightarrow$ $\cos\alpha < 0$: \
$$\cos\alpha = -\sqrt{\frac{2}{3}} = -\frac{\sqrt{2}}{\sqrt{3}} = -\frac{\sqrt{6}}{3}$$

Wynik: \
$$3\cos\alpha = 3 \cdot \left(-\frac{\sqrt{6}}{3}\right) = -\sqrt{6}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 20 - "magiczna" tożsamość

$$\sin 30° \cdot \cos 60° + \sin 60° \cdot \cos 30°$$

Rozpoznaj wzór: $\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$

Tu mamy $\sin(30° + 60°) = \sin 90° = \boxed{1}$.

> Lub:

Można zauważyć, że wszystkie funkcje można odczytać wprost z *tabelki* z naszej dokumentacji, więc można je wprost podstawić i obliczyć.

---

## Moduł 11: Geometria Płaska

### Pole trójkąta

- $$P = \frac{1}{2} \cdot a \cdot h_a$$
- $$P = \frac{1}{2} \cdot a \cdot b \cdot \sin C \quad \text{(wzór z sinusem)}$$
- $$P = \frac{a^2 \sqrt{3}}{4} \quad \text{(trójkąt równoboczny o boku } a\text{)}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Twierdzenie cosinusów

$$c^2 = a^2 + b^2 - 2ab\cos\gamma$$

> To uogólnienie Pitagorasa. Dla $\gamma = 90\degree$ daje Pitagorasa.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Podobieństwo trójkątów

Dwa trójkąty są podobne gdy mają takie same kąty. Wtedy boki są proporcjonalne. Tyle wystarczy.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 22.1

$\triangle ABC$: $|AB| = 6$, $|AC| = 4$, kąt $CAB = 60°$. $P_{\triangle} = ?$

$$P = \frac{1}{2} \cdot |AB| \cdot |AC| \cdot \sin(\angle CAB) = \frac{1}{2} \cdot 6 \cdot 4 \cdot \sin 60° = 12 \cdot \frac{\sqrt{3}}{2} = \boxed{6\sqrt{3}}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 22.2 - twierdzenie cosinusów

Ten sam trójkąt. $|BC| = ?$

$$|BC|^2 = |AB|^2 + |AC|^2 - 2 \cdot |AB| \cdot |AC| \cdot \cos(\angle CAB)$$ \
$$= 36 + 16 - 2 \cdot 6 \cdot 4 \cdot \cos 60°$$ \
$$= 52 - 48 \cdot \frac{1}{2} = 52 - 24 = 28$$ \

$$|BC| = \sqrt{28}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Kąty wpisane i środkowe w okręgu

**Zasada:** Kąt środkowy = **dwa razy** kąt wpisany oparty na tym samym łuku.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 19

$A$, $B$, $C$ na okręgu o środku $O$. $\angle BCA = 50\degree$. \
Ile wynosi kąt ostry $\angle ABO$?

Kąt środkowy $\angle BOA = 2 \cdot 50\degree = 100\degree$

$\triangle OAB$ jest trójkątem **równoramienny** ($|OA| = |OB| = r$), a kąty przy podstawie są równe: \
$$\angle OAB = \angle OBA = \frac{180\degree - 100\degree}{2} = \frac{80\degree}{2} = \boxed{40\degree}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 20 - podobieństwo

Trójkąt równoramienny $\triangle ABC$, w którym $|AC| = |BC| = 4$, $|AB| = 3$. \
Punkt $D$ leży na boku $BC$ między $B$ i $C$, trójkąty $\triangle ABC$ i $\triangle BDA$ są podobne.

Podobieństwo $\triangle ABC \sim \triangle BDA$ oznacza: $\frac{AB}{BD} = \frac{BC}{BA} = \frac{AC}{DA}$

$$\frac{AB}{BD} = \frac{BC}{BA} \Rightarrow \frac{3}{BD} = \frac{4}{3} \Rightarrow BD = \frac{9}{4} = 2{,}25$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

Geometria na płaszczyźnie to zabawa w szukanie brakujących parametrów. Często masz do dyspozycji 3 wzory na pole trójkąta (klasyczny $h$, z sinusem kąta i z promieniem).

- **Złota zasada**: Jeśli zadanie podaje Ci promień okręgu opisanego ($R$) lub wpisanego ($r$), **zawsze** będziesz używać wzorów na pole, które je zawierają ($P = \frac{abc}{4R}$ lub $P = p \cdot r$, gdzie $p$ to połowa obwodu).

- **Case Study** (Próbna Marzec 2026, Zadanie 21): Masz trapez równoramienny i przekątną będącą dwusieczną kąta. Co to znaczy? Dwusieczna to metoda, która bierze kąt $\alpha$ i dzieli go na pół: $\frac{\alpha}{2}$. Rysujesz to. Nagle się okazuje, że trójkąt "na górze" jest równoramienny. Nie zgaduj, rysuj wszystko na rysunku!

---

## Moduł 12: Geometria Analityczna

Na ten moduł niestety nie mam żadnych protipów. Jedno jest istotne: **kluczowy** jest dobry rysunek, więc zawsze go rób.

Od tej reguły nie ma odstępstw, tylko podejdź do tego na *trzeźwo*: Jeśli jest w zadaniu punkt $A(10, 99)$, to nie rysuj $99$ kratek! Wtedy rysunek zrób jedynie poglądowy, duży, nadal ładny. Gwarantuję ci, że pójdzie ci sprawniej.

---

## Moduł 13: Stereometria

### Obowiązkowy Protip: Sprowadź 3D do 2D

Twój mózg ma ograniczoną *pamięć graficzną* do renderowania figur 3D w wyobraźni.

Rozwiązanie: **wyciągnij kluczową figurę płaską na osobny rysunek**.

Mózg statystycznego maturzysty ma zintegrowaną kartę graficzną. Próba obliczenia przekątnych w locie w środowisku 3D skończy się zjawiskiem *Out of Memory* i panicznym atakiem na kartce.

Rozwiązaniem jest *Downsampling*:
- Zlokalizuj w bryle ten jeden, najważniejszy płaski trójkąt, którzy trzyma Twój kąt i zmienne.
- Narysuj go obok jako zwykłą figurę 2D.
- Od tego momentu to banalne dodawanie funkcji z planimetrii - z tego co wiem Twierdzenie Pitagorasa jest już za wami od ponad 4 lat.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 25

Stożek o tworzącej $l = 8$ i kącie rozwarcia $120\degree$.

Kąt rozwarcia to kąt między dwiema tworzącymi w przekroju osiowym. Każda tworząca tworzy $60\degree$ z osią (połowa kąta rozwarcia).

Rysunek 2D (trójkąt prostokątny z tworzącą, promieniem i wysokością):
- $l = 8$ (przeciwprostokątna)
- Kąt przy wierzchołku stożka = $60\degree$

$$r = l \cdot \sin 60° = 8 \cdot \frac{\sqrt{3}}{2} = 4\sqrt{3}$$ \
$$h = l \cdot \cos 60° = 8 \cdot \frac{1}{2} = 4$$

Objętość: $V = \frac{1}{3}\pi r^2 h = \frac{1}{3}\pi \cdot 48 \cdot 4 = 64\pi$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 26

Graniastosłup prawidłowy trójkątny. Wysokość podstawy ABC = $2\sqrt{3}$. Przekątna $AE$ ściany bocznej $ABED$ tworzy z $AB$ kąt $60\degree$.

**Sprowadzam ścianę boczną do 2D:** prostokąt ABED. Przekątna AE to przeciwprostokątna, AB to podstawa.

$$\tan 60° = \frac{BE}{AB} \Rightarrow \sqrt{3} = \frac{h}{AB}$$

gdzie $h$ - wysokość graniastosłupa.

Muszę znaleźć $AB$ z informacji o trójkącie ABC. Trójkąt równoboczny (graniastosłup prawidłowy trójkątny) o wysokości $2\sqrt{3}$:

Wysokość trójkąta równobocznego o boku $a$: $h_{\triangle} = \frac{a\sqrt{3}}{2}$

$$\frac{a\sqrt{3}}{2} = 2\sqrt{3} \Rightarrow a = 4$$

Zatem $AB = 4$.

$$\sqrt{3} = \frac{h}{4} \Rightarrow h = 4\sqrt{3}$$

Pole podstawy (trójkąt równoboczny, $a = 4$): \
$$P_{p} = \frac{a^2\sqrt{3}}{4} = \frac{16\sqrt{3}}{4} = 4\sqrt{3}$$

Objętość: \
$$V = P_{p} \cdot h = 4\sqrt{3} \cdot 4\sqrt{3} = 16 \cdot 3 = \boxed{48}$$

Pole powierzchni całkowitej: \
$$P_{c} = 2 \cdot P_{podst} + 3 \cdot P_{ściany bocznej}$$ \
$$P_{boku} = AB \cdot h = 4 \cdot 4\sqrt{3} = 16\sqrt{3}$$ \
$$P_{c} = 2 \cdot 4\sqrt{3} + 3 \cdot 16\sqrt{3} = 8\sqrt{3} + 48\sqrt{3} = \boxed{56\sqrt{3}}$$

---

## Moduł 14: Kombinatoryka

### Reguła mnożenia

Jeśli masz $n_1$ opcji dla kroku 1, $n_2$ dla kroku 2, ..., to łączna liczba kombinacji = $n_1 \cdot n_2 \cdot \ldots$

**Kluczowe:** Ta reguła działa, gdy kroki są **niezależne** lub gdy zależności są proste.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 27

Liczby naturalne trzycyfrowe nieparzyste z dokładnie jedną cyfrą 0.

**Struktura:** $\overline{ABC}$ gdzie $A \in \{1, \cdots ,9\}, B, C$ cyfry, liczba nieparzysta ($C$ nieparzyste), dokładnie jedno $0$.

Jedyne miejsce gdzie może być $0$: **środkowa pozycja $B$** ($A$ nie może być $0$ - to pierwsza cyfra, $C$ nie może być $0$ - nieparzysta).

- $A$: $9$ opcji (1-9)
- $B$ = $0$: 1 opcja
- $C$: $5$ opcji (1, 3, 5, 7, 9)

Razem: $9 \cdot 1 \cdot 5 = \boxed{45}$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 28

Liczby trzycyfrowe $> 500$ z tylko cyframi nieparzystymi.

Cyfry nieparzyste: $\{1, 3, 5, 7, 9\}$ - $5$ cyfr.

Liczba $> 500$ $\rightarrow$ pierwsza cyfra to 5, 7 lub 9 $\rightarrow$ 3 opcje.
Cyfra środkowa: $5$ opcji.
Cyfra ostatnia: $5$ opcji.

Razem: $3 \cdot 5 \cdot 5 = \boxed{75}$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Matura Próbna Marzec 2026, Zadanie 28

Drwal - 6 obszarów, 7 kolorów. Sąsiednie obszary różne kolory.

Patrząc na rysunek: 1 (kapelusz) graniczy z 2 (głowa). 2 graniczy z 3 (tułów) i 5 (ręka lewa). 3 graniczy z 4 (talia), 5. Itd.

Algorytm *"zachłanny"* - kolorujemy po kolei:
- Obszar 1: $7$ opcji
- Obszar 2 (graniczy z 1): $6$ opcji
- Obszar 3 (graniczy z 2): $6$ opcji
- Obszar 4 (graniczy z $3$ i $5$... sprawdź rysunek): $6$ opcji
- Obszar 5 (graniczy z $2$ i $3$): $6$ opcji
- Obszar 6 (graniczy z $5$): $6$ opcji

Razem: $7 \cdot 6^5$

---

## Moduł 15: Prawdopodobieństwo

### Prawdopodobieństwo klasyczne

$$P(A) = \frac{|A|}{|\Omega|}$$

$|A|$ = liczba zdarzeń sprzyjających, $|\Omega|$ = liczba wszystkich możliwych zdarzeń.

**Krok 1:** Wyznacz $|\Omega|$. \
**Krok 2:** Policz $|A|$. \
**Krok 3:** Wylicz ułamek. \
**Krok 4:** Sprawdź: wynik musi być w $[0, 1]$.

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 28

Dwa rzuty kostką. Suma = 11.

$|\Omega| = 6 \times 6 = 36$

Kombinacje dające sumę 11: $(5,6)$ i $(6,5)$ → $|A| = 2$

$$P(A) = \frac{2}{36}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Próbna Marzec 2026, Zadanie 29

Losowanie z liczb dwucyfrowych. Zdarzenie A: wielokrotność 34.

Dwucyfrowe wielokrotności 34: $34 \times 1 = 34$, $34 \times 2 = 68$, $34 \times 3 = 102$ (nie, trzycyfrowa).

$|A| = 2$

Liczby dwucyfrowe: od 10 do 99 $\rightarrow$ $|\Omega| = 90$.

$$P(A) = \frac{2}{90}$$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

Prawdopodobieństwo klasyczne to nic innego jak pisanie zapytań SQL. Mianownik (Omega), to wielkość całej bazy danych. Licznik to wyfiltrowane rekordy. Generujesz, filtrujesz i zwracasz proporcję. Ważny jednak w świecie programistycznym jest jeszcze *sanity check* - prawdopodobieństwo większe od 1 to krytyczny błąd w logice.

---

## Moduł 16: Statystyka

### Trzy miary: mediana, dominanta, średnia

**Dominanta (moda):** Wartość, która pojawia się najczęściej. Na wykresie słupkowym: **najwyższy słupek**.

**Średnia arytmetyczna:** $\bar{x} = \frac{\text{suma wszystkich wartości}}{\text{liczba obserwacji}}$

Dla danych pogrupowanych: $\bar{x} = \frac{\sum f_i \cdot x_i}{\sum f_i}$

> Nie przestraszcie się, to jest mimo wszystko protip. Chodzi o to że nie trzeba jak wół wszystkiego dodawać (ten znaczek - $\sum$ to *sigma* - czyli Suma), tylko można zrobić iloczyn jeśli to są te same dane, ale na to chyba każdy by wpadł sam.

**Mediana:** Wartość środkowa po posortowaniu. Dla $n$ obserwacji:
- $n$ nieparzyste: mediana to $\frac{n+1}{2}$-ty wyraz
- $n$ parzyste: mediana to średnia $\frac{n}{2}$-tego i $\left(\frac{n}{2}+1\right)$-tego wyrazu

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Sierpień 2025, Zadanie 30

Z wykresu słupkowego: 16 samochodów z 1 usterką, 10 z 2, 6 z 3, 3 z 4, 2 z 5. Razem: 37 samochodów.

**Dominanta:** Najwyższy słupek $\rightarrow$ 1 usterka (16 samochodów). Odpowiedź: **1**.

**Średnia:**
$$\bar{x} = \frac{16\cdot1 + 10\cdot2 + 6\cdot3 + 3\cdot4 + 2\cdot5}{16+10+6+3+2} = \frac{16+20+18+12+10}{37} = \frac{76}{37} \approx 2{,}054...$$

**Liczba samochodów z $≥ 2$ usterkami:** $10+6+3+2 = 21$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 30

24 uczniów. Z wykresu: ocena 1 $\rightarrow$ 1 uczeń, 2 $\rightarrow$ 3, 3 $\rightarrow$ 4, 4 $\rightarrow$ 4, 5 $\rightarrow$ 5, 6 $\rightarrow$ 7.

**Dominanta:** Ocena 6 (7 uczniów) - najwyższy słupek $\rightarrow$ **6**.

**Mediana:** $n = 24$ (parzyste), środek między 12. a 13. uczniem (po posortowaniu).

Liczę skumulowanie:
- do oceny 1: 1 uczeń (pozycje 1)
- do oceny 2: 4 uczniów (pozycje 1-4)
- do oceny 3: 8 uczniów (pozycje 1-8)
- do oceny 4: 12 uczniów (pozycje 1-12)
- do oceny 5: 17 uczniów (pozycje 1-17)

**12.** uczeń ma ocenę 4.\
**13.** uczeń ma ocenę 5.

Mediana = $(4+5)/2 = \boxed{4{,}5}$

<div className="w-full max-w-4xl border-t-2 border-dashed border-background-muted my-8"></div>

### Przykład: Maj 2025, Zadanie 29

Średnia arytmetyczna siedmiu liczb 1, 2, 3, 4, 5, x, y jest równa 3.

$$\frac{1+2+3+4+5+x+y}{7} = 3$$ \
$$15 + x + y = 21$$ \
$$x + y = 6$$

---

## Appendix: Najczęstsze Błędy

### Zapomniany warunek dziedziny

Gdy masz wyrażenie z mianownikiem lub logarytmem, sprawdź, kiedy jest niezdefiniowane. 

#### Sierpień 2025, Zadanie 8

$\frac{3}{3x-7} = \frac{5x}{x-8}$: $x \neq \frac{7}{3}$ i $x \neq 8$.

### Znak przy dzieleniu nierówności

Gdy dzielisz nierówność przez **ujemną** liczbę, **odwróć znak**. $-2x > 4$ $\rightarrow$ $x < -2$.

### Pomylenie argumentu z wartością

W zadaniu o hotelu: pytanie brzmi "jaka CENA?", nie "jakie X?". Zawsze wróć do pytania po obliczeniu.

### $x^2 + c$ bez pierwiastków

$x^2 + 25 = 0$ - brak rozwiązań rzeczywistych. Pamiętaj o tym.

### Kąt rozwarty a cosinus

Gdy kąt jest rozwarty ($90\degree < \alpha < 180\degree$), $\cos\alpha < 0$. CKE zawsze testuje tę własność.

### Mediana ≠ Średnia ≠ Dominanta

Trzy różne miary:
- Dominanta to najczęstszy wynik, nie środek. 
- Średnia to suma podzielona przez liczbę. 
- Mediana to środkowy wyraz po posortowaniu.

---

## Słowo na koniec

Dobrnęliśmy do końca. Zrobiliśmy cały zakres, który spokojnie pozwala zdać maturę, nawet nie na najniższe procenty, jeśli zostanie on opanowany w $100\%$. Fajnie, co?

Życzę Ci powodzenia, wszyscy tam byliśmy, więc wiem, że na pewno się stresujesz. Popatrz na to z innej strony: Matematyka jest schematyczna, kocha algorytmikę. Dobrze, że można się do niej tak fajnie przygotować!

## Chcesz ćwiczyć?

Stworzyłem **[Maturator](https://maturator.vercel.app)** - silnik generujący nieskończoną liczbę sparametryzowanych zadań ze wszystkich 16 kategorii, z rysunkami SVG i składem LaTeX. Każde zadanie jest inne. Uruchom "Exam Simulator", nastaw timer i trenuj do skutku.

> Niektóre wykresy mogą być rozjechane, nadal to szlifuję.

*Kompilujcie bez błędów, uczcie się pilnie i zdajcie - matura się w życiu przydaje, naprawdę.*

Powodzenia maturzyści.
