---
title: "Math Matura Exam 2026: Live Solutions"
excerpt: "Real-time reverse-engineering of the Polish Matura Exam in Mathematics (May 2026)."
date: "2026-05-05"
tags:
  - "Math"
  - "Education"
  - "Matura"
font: "merriweather"
---

> **Article below is in Polish language, since the Matura Exam is being held in Poland.** \
This article purposely uses different font, to be more pleasant during reading.

---

> Status: **Rozwiązana** \
> Ostatnia aktualizacja: `05.05.2026 14:34`

Tak szybko jak pojawi się dostępny arkusz i położę na nim swoje ręce, tak szybko rozwiązania pojawią się poniżej. Naprawdę liczę, że wszyscy pamiętali żeby wyjść z zapisanymi odpowiedziami w formacie `Zad.1: y=6`, a nie `Zad.1: A`, z racji faktu tego, że są różne wersje arkuszy z przetasowanymi odpowiedziami!

---

### Zadanie 1. (1 pkt)
> **Treść:** Obliczenie wartości wyrażenia $\sqrt{\frac{25}{8}}\cdot\sqrt{2}+2^{-1}$.

**Logika / Algorytm:**
Wrzucamy ułamki pod jeden wspólny pierwiastek kwadratowy, a ujemną potęgę zamieniamy na ułamek.

$$
\sqrt{\frac{25}{8} \cdot 2} + \frac{1}{2}
$$
$$
\sqrt{\frac{25}{4}} + \frac{1}{2} = \frac{5}{2} + \frac{1}{2} = \frac{6}{2} = 3
$$

**Odpowiedź:** $3$

---

### Zadanie 2. (1 pkt)
> **Treść:** Lokata 10 000 zł na 2 lata, 6% w skali roku, procent składany. Ile wynoszą doliczone odsetki?

**Logika / Algorytm:**
Korzystamy ze wzoru na procent składany, aby policzyć kapitał końcowy, a następnie odejmujemy od niego wkład początkowy.

$$
K = 10000 \cdot (1 + 0.06)^2 = 10000 \cdot 1.1236 = 11236
$$
$$
Odsetki = 11236 - 10000 = 1236
$$

**Odpowiedź:** $1236$ zł

---

### Zadanie 3. (1 pkt)
> **Treść:** Zapisanie liczby $\sqrt{5\sqrt{5}}$ w postaci potęgi.

**Logika / Algorytm:**
Zamieniamy wszystkie pierwiastki na potęgi ułamkowe i dodajemy/mnożymy wykładniki. Pierwiastek kwadratowy to potęga $\frac{1}{2}$.

$$
\sqrt{5 \cdot 5^{\frac{1}{2}}} = \sqrt{5^{1 + \frac{1}{2}}} = \sqrt{5^{\frac{3}{2}}}
$$
$$
(5^{\frac{3}{2}})^{\frac{1}{2}} = 5^{\frac{3}{2} \cdot \frac{1}{2}} = 5^{\frac{3}{4}}
$$

**Odpowiedź:** $5^{\frac{3}{4}}$

---

### Zadanie 4. (1 pkt)
> **Treść:** Obliczenie wartości $\log_8 4 - \log_8 32$.

**Logika / Algorytm:**
Mamy tę samą podstawę logarytmu. Stosujemy wzór na różnicę logarytmów (dzielenie argumentów).

$$
\log_8 \left(\frac{4}{32}\right) = \log_8 \left(\frac{1}{8}\right)
$$
Do jakiej potęgi podnieść $8$, by dostać $\frac{1}{8}$? Oczywiście do $-1$.

**Odpowiedź:** $-1$

---

### Zadanie 5. (1 pkt)
> **Treść:** Ocena prawdziwości:
> 1. Liczba $4^{12} \cdot 5^{24}$ dzieli się przez 20.
> 2. Ta sama liczba ma 25 cyfr dziesiętnych.

**Logika / Algorytm:**
Upraszczamy potęgi, doprowadzając do wspólnego wykładnika. Wiemy, że $4 = 2^2$.

$$
4^{12} \cdot 5^{24} = (2^2)^{12} \cdot 5^{24} = 2^{24} \cdot 5^{24} = (2 \cdot 5)^{24} = 10^{24}
$$
$10^{24}$ to jedynka i $24$ zera. Razem $25$ cyfr. (Zatem drugie zdanie: **PRAWDA**).
Czy dzieli się przez $20$? $10^{24} = 100 \cdot 10^{22} = 20 \cdot 5 \cdot 10^{22}$. Tak, dzieli się bez reszty. (Zatem pierwsze zdanie: **PRAWDA**).

**Odpowiedź:** **P**, **P**

---

### Zadanie 6. (1 pkt)
> **Treść:** Wartość wyrażenia $x^2 + 10x + 25$ dla $x = \sqrt{2} - 5$.

**Logika / Algorytm:**
Zamiast podstawiać wprost, zwijamy trójmian korzystając ze wzoru skróconego mnożenia: $(a+b)^2 = a^2 + 2ab + b^2$.

$$
x^2 + 10x + 25 = (x + 5)^2
$$
Teraz podstawiamy $x$:
$$
(\sqrt{2} - 5 + 5)^2 = (\sqrt{2})^2 = 2
$$

**Odpowiedź:** $2$

---

### Zadanie 7. (2 pkt)
> **Treść:** Wykaż, że dla całkowitego $n$ liczba $7n^2 + 21n$ jest podzielna przez 14.

**Logika / Algorytm:**
Wyciągamy największy wspólny czynnik przed nawias i analizujemy własności parzystości.

$$
7n^2 + 21n = 7n(n + 3)
$$
Liczby $n$ oraz $n+3$ mają różną parzystość (jeśli jedna jest parzysta, druga jest nieparzysta). Iloczyn liczby parzystej i nieparzystej daje zawsze liczbę parzystą. Zatem iloczyn $n(n+3)$ można zapisać jako $2k$ (gdzie $k$ to pewna liczba całkowita).

$$
7 \cdot (2k) = 14k
$$
Liczba dzieli się przez 14, co należało dowieść. `[c.k.d.]`

Lub można skorzystać ze sposobu, gdzie wszystkie liczby dzielimy na parzyste oraz nieparzyste a następnie podstawiać odpowiednio $n=2k$ oraz $n=2k+1$ nie zapominając o **założeniach**: $k \in \mathbb{Z}$!

---

### Zadanie 8. (1 pkt)
> **Treść:** Suma rozwiązań równania $3(x+3)(x-m)(2x+4)=0$ wynosi 0. Oblicz $m$.

**Logika / Algorytm:**
Równanie jest w postaci iloczynowej. Przyrównujemy każdy nawias do zera.

1. $x + 3 = 0 \Rightarrow x_1 = -3$
2. $x - m = 0 \Rightarrow x_2 = m$
3. $2x + 4 = 0 \Rightarrow x_3 = -2$

Suma pierwiastków to $0$:
$$
-3 + m - 2 = 0 \Rightarrow m - 5 = 0 \Rightarrow m = 5
$$

**Odpowiedź:** $5$

---

### Zadanie 9. (1 pkt)
> **Treść:** Rozwiąż równanie wymierne $\frac{x+2}{3x-1} = \frac{2}{5}$.

**Logika / Algorytm:**
Wyznaczamy dziedzinę (mianownik $\neq 0$, czyli $x \neq \frac{1}{3}$), a potem mnożymy "na krzyż".

$$
5 \cdot (x + 2) = 2 \cdot (3x - 1)
$$
$$
5x + 10 = 6x - 2
$$
Przenosimy $x$ na prawą stronę, a liczby na lewą:
$$
12 = x
$$

**Odpowiedź:** $12$

---

### Zadanie 10. (2 pkt)
> **Treść:** Rozwiąż nierówność $3x^2 + 4x \ge 6x + 8$.

**Logika / Algorytm:**
Przenosimy wszystko na lewą stronę i liczymy deltę, a na koniec odczytujemy wynik z wykresu paraboli.

$$
3x^2 - 2x - 8 \ge 0
$$
$$
\Delta = (-2)^2 - 4 \cdot 3 \cdot (-8) = 4 + 96 = 100 \Rightarrow \sqrt{\Delta} = 10
$$
$$
x_1 = \frac{2 - 10}{6} = \frac{-8}{6} = -\frac{4}{3}
$$
$$
x_2 = \frac{2 + 10}{6} = \frac{12}{6} = 2
$$
Współczynnik przy $x^2$ jest dodatni (ramiona w górę), nierówność to $\ge$, więc bierzemy zbiory na zewnątrz pierwiastków.

**Odpowiedź:** $x \in (-\infty, -\frac{4}{3}] \cup [2, \infty)$

### Zadanie 11. (2 pkt)
> **Treść:** Sprzedano 200 biletów (normalne 35 zł, ulgowe 25 zł). Po odliczeniu 25% kosztów organizatorom zostało 4665 zł. Oblicz liczbę biletów ulgowych.

**Logika / Algorytm:**
Obliczamy całkowite wpływy z biletów ($W$). Skoro zostało 75% wpływów, układamy proste równanie:
$$
0.75W = 4665 \quad \Big/ : 0.75 \implies W = 6220
$$
Teraz układ równań. Niech $x$ to bilety normalne, a $y$ ulgowe. Skoro łączna liczba biletów to 200, podstawiamy $x = 200 - y$:
$$
35(200 - y) + 25y = 6220
$$
$$
7000 - 35y + 25y = 6220
$$
$$
-10y = -780 \implies y = 78
$$

**Odpowiedź:** Sprzedano **78** biletów ulgowych.

---

### Zadanie 12.1 (2 pkt)
> **Treść:** Na podstawie wykresu funkcji klamrowej określ: rozwiązanie $f(x)=3$ oraz największą wartość w przedziale $[2, 3]$.

**Logika / Algorytm:**
1. Z wykresu pozioma prosta $y=3$ przecina lewe ramię funkcji dla $x=1$. Dla prawej gałęzi warunek to $-x+5=3 \implies x=2$, ale $x=2$ wypada z dziedziny $(2,5)$ (otwarte kółko na wykresie).
2. W przedziale domkniętym $[2, 3]$ szukamy maksimum. $f(2) = 4$. Dla $x \in (2, 3]$ funkcja maleje, więc 4 to najwyższy punkt.

**Odpowiedź:**
1. Rozwiązaniem jest: **1**
2. Największa wartość to: **4**

---

### Zadanie 12.2 (2 pkt)
> **Treść:** Na podstawie tego samego wykresu podaj zbiór wartości oraz argumenty dla których $f(x) > 1$.

**Logika / Algorytm:**
1. Rzutujemy cały wykres na oś OY. Minimum jest osiągane w punkcie $(-4, -2)$, maksimum w $(2, 4)$. Punkty są zamalowane.
2. Szukamy $x$, dla których wykres leży powyżej $y=1$.
Lewa strona: $x + 2 > 1 \implies x > -1$. Prawa strona: $-x + 5 > 1 \implies x < 4$.

**Odpowiedź:**
1. Zbiór wartości: **$[-2, 4]$**
2. Argumenty $> 1$: **$(-1, 4)$**

---

### Zadanie 13. (2 pkt w sumie - cz. 1 i 2)
> **Treść:** Wykres funkcji $f(x)=ax+b$ przecina osie całkowicie w punktach z rysunku. Oceń znaki $a$ i $b$ (13.1) i oblicz $\tan \alpha$ (13.2).

**Logika / Algorytm:**
Parsujemy wykres. Funkcja jest malejąca (zatem z definicji $a < 0$). Przecina oś OY poniżej osi OX (zatem $b < 0$).
Z rysunku odczytujemy dwa punkty: $(-2, 0)$ oraz $(0, -3)$. Obliczamy współczynnik kierunkowy $a$, który jest dokładnie szukanym tangensem kąta nachylenia.

$$
a = \tan \alpha = \frac{y_2 - y_1}{x_2 - x_1} = \frac{-3 - 0}{0 - (-2)} = -\frac{3}{2}
$$

**Odpowiedź 13.1:** $a$ jest dodatnią? **F** (Fałsz) | $b$ jest dodatnią? **F** (Fałsz) \
**Odpowiedź 13.2:** $-\frac{3}{2}$

---

### Zadanie 14. (4 pkt)
> **Treść:** Wykres $f(x)$ to parabola o wierzchołku $W=(3, -2)$. Funkcja $g(x) = f(x+1)$ ma miejsce zerowe dla $x=0$. Wyznacz wzór ogólny $f(x)$.

**Logika / Algorytm:**
Zapisujemy $f(x)$ w postaci kanonicznej (nasz "constructor" funkcji kwadratowej).
$$
f(x) = a(x - 3)^2 - 2
$$
Wyznaczamy $g(x)$, przesuwając o wektor $[-1, 0]$ w lewo:
$$
g(x) = a((x+1) - 3)^2 - 2 = a(x - 2)^2 - 2
$$
Podstawiamy miejsce zerowe $g(0) = 0$, by zdekodować $a$:
$$
a(0 - 2)^2 - 2 = 0 \implies 4a = 2 \implies a = \frac{1}{2}
$$
Wracamy do wzoru $f(x)$ i konwertujemy do postaci ogólnej:
$$
f(x) = \frac{1}{2}(x^2 - 6x + 9) - 2 = \frac{1}{2}x^2 - 3x + 4.5 - 2
$$

**Odpowiedź:** $f(x) = \frac{1}{2}x^2 - 3x + \frac{5}{2}$ (lub $2.5$)

---

### Zadanie 15. (3 pkt)
> **Treść:** Ciąg $a_n = 3n+5$. Ciąg $(a_1, a_9, a_k)$ jest geometryczny. Oblicz $k$.

**Logika / Algorytm:**
Kompilujemy potrzebne wyrazu ciągu na liczby:
$$
a_1 = 3(1) + 5 = 8 \quad \text{oraz} \quad a_9 = 3(9) + 5 = 32
$$
Z własności ciągu geometrycznego (środkowy wyraz do kwadratu to iloczyn sąsiadów):
$$
(a_9)^2 = a_1 \cdot a_k
$$
$$
32^2 = 8 \cdot (3k + 5)
$$
$$
1024 = 24k + 40 \implies 984 = 24k \implies k = 41
$$

**Odpowiedź:** $k = 41$

---

### Zadanie 16. (1 pkt)
> **Treść:** Ciąg arytmetyczny $a_1=1, a_5=17$. Oblicz $a_9$.

**Logika / Algorytm:**
Odstępy w tablicy rosną liniowo. Pomiędzy indeksem 1 a 5 jest 4x krok ($r$).
$$
17 = 1 + 4r \implies 16 = 4r \implies r = 4
$$
Szukamy indeksu 9, dodając kolejne 4 kroki do elementu piątego.
$$
a_9 = a_5 + 4r = 17 + 16 = 33
$$
*(Skrót myślowy: $a_5$ to średnia arytmetyczna $a_1$ i $a_9$, więc z symetrii $a_9 = 34 - 1$)*

**Odpowiedź:** $33$

---

### Zadanie 17. (1 pkt)
> **Treść:** Ciąg geometryczny. Iloczyn $a_3 \cdot a_6 = 18$. Oblicz $a_2 \cdot a_7$.

**Logika / Algorytm:**
Własność indeksów w ciągach geometrycznych: jeśli suma indeksów jest równa, to iloczyny wyrazów też są równe.
$3 + 6 = 9$
$2 + 7 = 9$
Dla formalności z def: $(a_1q^2)(a_1q^5) = a_1^2q^7 = 18$. Iloczyn $(a_1q)(a_1q^6)$ to dokładnie to samo wyrażenie.

**Odpowiedź:** $18$

---

### Zadanie 18. (1 pkt)
> **Treść:** Trójkąt prostokątny, przeciwprostokątna $|AC| = 2\sqrt{10}$, przyprostokątna $|BC| = 2$. Oblicz $\sin \gamma$ przy wierzchołku $C$.

**Logika / Algorytm:**
Wywołujemy Twierdzenie Pitagorasa, by znaleźć drugą przyprostokątną $|AB|$ (naprzeciwległą do kąta $\gamma$).
$$
|AB|^2 + 2^2 = (2\sqrt{10})^2 \implies |AB|^2 + 4 = 40 \implies |AB|^2 = 36 \implies |AB| = 6
$$
Definicja funkcji sinus w tym trójkącie (stosunek boku przeciwległego do przeciwprostokątnej):
$$
\sin \gamma = \frac{|AB|}{|AC|} = \frac{6}{2\sqrt{10}} = \frac{3}{\sqrt{10}}
$$

**Odpowiedź:** $\frac{3}{\sqrt{10}}$

---

### Zadanie 19. (1 pkt)
> **Treść:** Kąty w okręgu. Wpisany $CDA = 50^\circ$, środkowy $COB = 30^\circ$. Oblicz ostry kąt środkowy $BOA$.

**Logika / Algorytm:**
1. Kąt środkowy oparty na tym samym łuku ($AC$) co wpisany $CDA$ ($50^\circ$) jest dwa razy większy: $AOC = 100^\circ$.
2. Patrzymy na rysunek. Punkt $B$ dzieli ten łuk, więc kąty środkowe się sumują:
$$
\measuredangle AOC = \measuredangle AOB + \measuredangle BOC
$$
$$
100^\circ = \measuredangle AOB + 30^\circ \implies \measuredangle AOB = 70^\circ
$$

**Odpowiedź:** $70^\circ$

---

### Zadanie 20. (1 pkt)
> **Treść:** Podobieństwo Talesa. Odcinki $|OA|=12, |OB|=6, |OC|=8$. Oblicz $|OD|$.

**Logika / Algorytm:**
Proste $k$ i $l$ są równoległe, tworząc dwa trójkąty podobne $AOD$ i $COB$ o wierzchołku w punkcie przecięcia. Układamy proporcję "po ramionach" odpowiednich prostych. Zwróć uwagę, że na prostej $m$ mamy segmenty $A$ i $C$, a na prostej $n$ mamy segmenty $D$ i $B$.
$$
\frac{|OD|}{|OB|} = \frac{|OA|}{|OC|}
$$
$$
\frac{|OD|}{6} = \frac{12}{8} \implies |OD| = \frac{12 \cdot 6}{8} = \frac{72}{8} = 9
$$

**Odpowiedź:** $9$

### Zadanie 21. (2 pkt) - Dowód geometryczny
> **Treść:** W trójkącie $KLM$ boki to $|KM|=a, |LM|=b$. Dwusieczna kąta $LMK$ przecina bok $KL$ w punkcie $N$. Wykaż, że stosunek pola $\Delta KNM$ do pola $\Delta NLM$ to $\frac{a}{b}$.

**Logika / Algorytm (Design Pattern: Pole z sinusem):**
Trójkąty $KNM$ i $NLM$ współdzielą bok $|MN|$. Z definicji dwusiecznej wiemy, że dzieli ona kąt przy wierzchołku $M$ na dwie równe połowy, oznaczmy je jako $\alpha$.
Wywołujemy wzór na pole trójkąta z sinusem: $P = \frac{1}{2} x y \sin(\text{kąt})$.

$$
P_{KNM} = \frac{1}{2} \cdot a \cdot |MN| \cdot \sin(\alpha)
$$
$$
P_{NLM} = \frac{1}{2} \cdot b \cdot |MN| \cdot \sin(\alpha)
$$
Liczymy ich stosunek, w którym niemal wszystko się skraca:
$$
\frac{P_{KNM}}{P_{NLM}} = \frac{\frac{1}{2} \cdot a \cdot |MN| \cdot \sin(\alpha)}{\frac{1}{2} \cdot b \cdot |MN| \cdot \sin(\alpha)} = \frac{a}{b}
$$
`[c.k.d.]`

---

### Zadanie 22. (1 pkt)
> **Treść:** Promień okręgu opisanego na trójkącie równobocznym wynosi $9\sqrt{3}$. Oblicz bok tego trójkąta.

**Logika / Algorytm:**
Ładujemy gotowy wzór z tablic CKE na promień okręgu opisanego na trójkącie równobocznym.
$$
R = \frac{a\sqrt{3}}{3}
$$
Podstawiamy nasze parametry wejściowe i rozwiązujemy dla $a$:
$$
\frac{a\sqrt{3}}{3} = 9\sqrt{3} \quad \Big/ \cdot 3
$$
$$
a\sqrt{3} = 27\sqrt{3} \quad \Big/ : \sqrt{3} \implies a = 27
$$

**Odpowiedź:** **27**

---

### Zadanie 23. (1 pkt)
> **Treść:** Dla kąta ostrego $\alpha$ zachodzi $\frac{3\sin\alpha + 4\cos\alpha}{4\cos\alpha} = 6$. Oblicz $\tan\alpha$.

**Logika / Algorytm:**
Zaczynamy od rozdzielenia ułamka na dwa oddzielne terminy.
$$
\frac{3\sin\alpha}{4\cos\alpha} + \frac{4\cos\alpha}{4\cos\alpha} = 6
$$
Z tablic pamiętamy, że $\frac{\sin\alpha}{\cos\alpha} = \tan\alpha$.
$$
\frac{3}{4}\tan\alpha + 1 = 6 \implies \frac{3}{4}\tan\alpha = 5
$$
Mnożymy obie strony przez $\frac{4}{3}$:
$$
\tan\alpha = 5 \cdot \frac{4}{3} = \frac{20}{3}
$$

**Odpowiedź:** $\frac{20}{3}$

---

### Zadanie 24.1 (1 pkt)
> **Treść:** Trójkąt prostokątny zbudowany jest na punktach $A=(0,-3)$, $B=(2,1)$, $C=(0,2)$. Oblicz pole trójkąta $ABC$.

**Logika / Algorytm:**
Parsujemy koordynaty. Wierzchołki $A$ i $C$ leżą bezpośrednio na osi $OY$ (ponieważ ich współrzędna $x=0$). 
Długość tego boku to po prostu odległość na osi: $|AC| = 2 - (-3) = 5$. To będzie nasza podstawa.
Wysokość opuszczona z wierzchołka $B$ na tę podstawę (oś OY) to po prostu współrzędna $X$ punktu $B$, czyli $h = 2$.
$$
P = \frac{1}{2} a h = \frac{1}{2} \cdot 5 \cdot 2 = 5
$$

**Odpowiedź:** $5$

---

### Zadanie 24.2 (1 pkt)
> **Treść:** Wyznacz środek okręgu opisanego na trójkącie $ABC$ z poprzedniego zadania.

**Logika / Algorytm:**
Geometria podpowiada, że środek okręgu opisanego na trójkącie prostokątnym zawsze znajduje się idealnie w środku przeciwprostokątnej. Musimy znaleźć ten najdłuższy bok.
Skoro odcinek na osi OY to $|AC| = 5$, to $|AC|^2 = 25$.
Obliczmy kwadrat z Pitagorasa odcinków od $B$: 
$|BC|^2 = (2-0)^2 + (1-2)^2 = 4 + 1 = 5$
$|AB|^2 = (2-0)^2 + (1-(-3))^2 = 4 + 16 = 20$
Ponieważ $5 + 20 = 25$, to bok $AC$ jest przeciwprostokątną!
Środek $AC$ to wyciągnięcie średniej z ich współrzędnych:
$$
S = \left(\frac{0+0}{2}, \frac{-3+2}{2}\right) = (0, -0.5)
$$

**Odpowiedź:** $(0, -\frac{1}{2})$

---

### Zadanie 25. (1 pkt)
> **Treść:** Okrąg o promieniu 5 ma środek w $(1, -3)$. Oceń czy punkt $A=(4,-7)$ leży na okręgu oraz czy okrąg ma równanie $(x-1)^2 + (y+3)^2 = 5$.

**Logika / Algorytm:**
Równanie z dokumentacji: $(x - a)^2 + (y - b)^2 = r^2$.
Podstawiamy nasze dane: $(x - 1)^2 + (y + 3)^2 = 25$. Zatem podane zdanie 2 jest błędne (mylą promień z jego kwadratem).
Aby sprawdzić zdanie 1, liczymy wektor od środka do punktu $A$ – jeśli odległość wynosi równo 5, znaczy, że leży.
$$
|SA| = \sqrt{(4-1)^2 + (-7-(-3))^2} = \sqrt{3^2 + (-4)^2} = \sqrt{9+16} = \sqrt{25} = 5
$$
Odległość wynosi dokładnie 5. Punkt leży na okręgu.

**Odpowiedź:** **P**, **F**

---

### Zadanie 26. (1 pkt)
> **Treść:** Prosta $l$ jest równoległa do prostej $y = -\frac{1}{3}x + 2$ i przechodzi przez $(2, -2)$. W którym punkcie przecina oś OY?.

**Logika / Algorytm:**
Z właściwości prostych równoległych kopiujemy współczynnik $a = -\frac{1}{3}$. 
Zatem wzór szukanej prostej to $y = -\frac{1}{3}x + b$.
Podstawiamy punkt wejściowy, by odkryć $b$:
$$
-2 = -\frac{1}{3} \cdot 2 + b \implies b = -2 + \frac{2}{3} = -\frac{4}{3}
$$
Przecięcie z osią OY zawsze zachodzi w koordynatach $(0, b)$.

**Odpowiedź:** $(0, -\frac{4}{3})$

---

### Zadanie 27. (2 pkt)
> **Treść:** Ostrosłup prawidłowy czworokątny. Przekątna podstawy to $8\sqrt{3}$. Kąt nachylenia krawędzi bocznej do podstawy to $30^\circ$. Oblicz objętość.

**Logika / Algorytm:**
1. Podstawa to kwadrat. Mając przekątną, liczymy jej pole (np. wzorem dla rombu $P = \frac{d^2}{2}$):
$$
P_p = \frac{(8\sqrt{3})^2}{2} = \frac{64 \cdot 3}{2} = 96
$$
2. Wysokość bryły $H$, krawędź boczna i połowa przekątnej podstawy tworzą trójkąt prostokątny. Skoro kąt przy podstawie ma $30^\circ$, to używamy funkcji tangens (albo reguł "trójkąta ekierki" 30-60-90).
Połowa przekątnej to $4\sqrt{3}$.
$$
\tan(30^\circ) = \frac{H}{4\sqrt{3}} \implies \frac{\sqrt{3}}{3} = \frac{H}{4\sqrt{3}}
$$
$$
H = \frac{\sqrt{3} \cdot 4\sqrt{3}}{3} = \frac{12}{3} = 4
$$
3. Wyliczamy objętość całkowitą.
$$
V = \frac{1}{3} P_p H = \frac{1}{3} \cdot 96 \cdot 4 = 32 \cdot 4 = 128
$$

**Odpowiedź:** Objętość to **128**

---

### Zadanie 28. (1 pkt)
> **Treść:** Stożek i walec mają równe wysokości $H$. Promień stożka $R_s$ to $2\times$ promień walca $R_w$. Zwróć stosunek objętości stożka do objętości walca.

**Logika / Algorytm:**
Zapiszmy formuły matematyczne w czystej postaci.
$$
V_{walca} = \pi \cdot (R_w)^2 \cdot H
$$
$$
V_{stozka} = \frac{1}{3} \pi \cdot (2R_w)^2 \cdot H = \frac{4}{3} \pi \cdot (R_w)^2 \cdot H
$$
Liczymy proporcję (dzielenie dwóch algorytmów przez siebie):
$$
\frac{V_{stozka}}{V_{walca}} = \frac{\frac{4}{3}}{1} = \frac{4}{3}
$$

**Odpowiedź:** $\frac{4}{3}$

---

### Zadanie 29. (1 pkt)
> **Treść:** Tworzymy liczby 3-cyfrowe nieparzyste tylko z cyfr $\{0, 1, 2, 3, 4, 5, 6\}$. Ile ich powstanie?.

**Logika / Algorytm:**
Konstruujemy liczbę (rezerwujemy sloty pamięci): _ _ _
1. Cyfra jedności decyduje czy liczba jest nieparzysta. Dozwolone: $\{1, 3, 5\}$. Zatem: **3 opcje**.
2. Cyfra setek (pierwsza od lewej) nie może być zerem. Dopuszczamy więc wszystko z puli oprócz zera. Zatem: **6 opcji**.
3. Cyfra dziesiątek może być dowolnym z 7 udostępnionych znaków. Zatem: **7 opcji**.
Silnik kombinatoryczny (reguła mnożenia) składa to w $6 \cdot 7 \cdot 3$.

**Odpowiedź:** $6 \cdot 7 \cdot 3$

---

### Zadanie 30. (2 pkt)
> **Treść:** Kombinatoryka z warunkiem logicznym. Zbiory $X=\{1, 3, 5, 7, 9\}$ i $Y=\{0, 2, 4, 6, 8\}$. $X$ to dziesiątki, $Y$ to jedności. Jakie jest p-stwo, że taka liczba dwucyfrowa będzie podzielna przez 6?.

**Logika / Algorytm:**
Całkowita pula ($|\Omega|$) to liczba elementów w $X$ pomnożona przez liczbę elementów w $Y$: $5 \cdot 5 = 25$.
Warunek sprawdzający modulo: Kiedy liczba dzieli się przez 6? Gdy dzieli się i przez 2, i przez 3. Ponieważ wszystkie jedności pochodzą ze zbioru parzystego $Y$, warunek parzystości jest spełniony zawsze (100% czasu).
Musimy zbadać, kiedy ułożona liczba jest podzielna przez 3 (suma cyfr $x + y$ musi być podzielna przez 3). Piszemy krótką pętlę weryfikacyjną na kartce:
- Jeśli dobierzesz $y=0$, to $x$ może być $3$ lub $9$ (Liczby: 30, 90). (2 trafienia)
- Jeśli $y=2$, to $x$ to $1$ lub $7$ (12, 72). (2 traf.)
- Jeśli $y=4$, to $x$ to $5$ (54). (1 traf.)
- Jeśli $y=6$, to $x$ to $3$ lub $9$ (36, 96). (2 traf.)
- Jeśli $y=8$, to $x$ to $1$ lub $7$ (18, 78). (2 traf.)
Zdarzenia kompilujące się poprawnie (Zbiór $A$): $2+2+1+2+2 = 9$.
Prawdopodobieństwo: $P(A) = \frac{9}{25}$

**Odpowiedź:** **$\frac{9}{25}$** (lub $0.36$)

---

### Zadanie 31. (1 pkt)
> **Treść:** Analiza diagramów słupkowych dla klas IV A i IV B. Należy ocenić, czy ich średnia i mediana są sobie równe.

**Logika / Algorytm:**
1. Zauważmy "symetrię" - oba wykresy są w pełni symetryczne względem osi środkowej znajdującej się równo pomiędzy ocenami 3 i 4. Kiedy dystrybucja jest idealnie zbalansowana, jej rozkład średniej wyśrodkowuje się samoistnie. W obu przypadkach średnia wynosi $3.5$. Wniosek 1: To prawda.
2. Zliczmy elementy bazy, żeby dotrzeć do mediany. Ocen w klasach jest równe 20 ($N=20$). Mediana u parzystego rozkładu to wyciągnięcie średniej z pozycji indeks 10 i indeks 11 z posortowanej puli.

Dla A: Mamy 1 jedynkę, 6 dwójek (razem 7). Trójek jest 3. Zatem elementy nr 8, 9, 10 to ocena 3. Elementy 11, 12, 13 to oceny 4. Mediana = $(3+4)/2 = 3.5$.

Dla B: 1 jedynka, 3 dwójki (razem 4). Szóstka trójek. Elementy 5, 6, 7, 8, 9, 10 to ocena 3. Elementy nr 11 to już 4. Mediana = $(3+4)/2 = 3.5$.

Wniosek 2: Mediany są identyczne. To prawda.

**Odpowiedź:** **P**, **P**

---

### Zadanie 32. (1 pkt)
> **Treść:** Średnia arytmetyczna z 3 liczb to 2. Z 4 innych liczb to 5.5. Ile wynosi uśredniona dla całości?.

**Logika / Algorytm:**
Suma wszystkich elementów to najważniejsza liczba dla globalnej średniej arytmetycznej. Wyliczamy ją ze wskaźników lokalnych.
Suma pierwszej grupy: $3 \cdot 2 = 6$
Suma drugiej grupy: $4 \cdot 5.5 = 22$
Łączna suma: $6 + 22 = 28$
Otrzymaną sumę dzielimy przez całkowity nakład danych w bazie (7 liczb).
$$
\frac{28}{7} = 4
$$

**Odpowiedź:** $4$

---

### Zadanie 33.1 (1 pkt)
> **Treść:** Oblicz, kiedy piłeczka, poruszająca się wg logiki $h(t) = -4.9t^2 + 14.7t$, uderzy z powrotem w ziemię ($h = 0$).

**Logika / Algorytm:**
Zadanie wymaga znalezienia zer w trójmianie kwadratowym.
$$
-4.9t^2 + 14.7t = 0
$$
Wyciągamy zmienną $t$ oraz stałą przed nawias. Współczynniki to nic innego jak matematyka z tabliczki mnożenia ($49 \cdot 3 = 147$).
$$
-4.9t \cdot (t - 3) = 0
$$
Start nastąpił w chwili $t=0$. Punkt uderzenia o twardą ziemię następuje w czasie $t=3$.

**Odpowiedź:** $3$ s

---

### Zadanie 33.2 (1 pkt)
> **Treść:** Oblicz w której sekundzie piłeczka osiąga apogeum (wierzchołek na wykresie).

**Logika / Algorytm:**
Wzór na wierzchołek ($p$) to $p = \frac{-b}{2a}$, ale jako wirtuozi algorytmów pamiętajmy, że parabole są idealnie symetryczne. Czas maksymalnej wysokości znajduje się kropka-w-kropkę pomiędzy czasami uderzeń.
$$
t_{max} = \frac{0 + 3}{2} = 1.5
$$

**Odpowiedź:** $1.5$ s
