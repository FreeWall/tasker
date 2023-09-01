# Tasker

![](https://wakatime.com/badge/user/d694f266-3f1b-44cd-82b9-e9c093472e23/project/120c30f1-4700-4e08-9532-20b2888c583a.svg)
[![](https://img.shields.io/github/deployments/FreeWall/tasker/Production?logo=vercel&label=vercel)](https://tasker.michalvanek.cz/)

> ## Vytvořte fullstack webovou aplikaci v TypeScriptu na vytváření a správu úkolů
>
> ### Design
>
> - Vzhled aplikace by měl být esteticky příjemný a uživatelsky intuitivní.
> - Není třeba dělat aplikaci responsivní - stačí desktopová verze.
>
> ### Seznam úkolů
>
> - Vytvořte stránku s názvem "Seznam úkolů", kde uživatelé, kteří jsou > přihlášení, uvidí seznam jejich existujících úkolů.
> - Každý úkol by měl obsahovat název, popis a další relevantní informace.
> - Formulář na přidání / úpravu úkolu:
>   - Na stránce "Seznam úkolů" přidejte odkaz, který uživatele přesměruje na > formulář pro přidání nebo úpravu úkolu.
>   - Implementujte formulář s vhodnými poli, která umožní uživatelům přidávat nové > úkoly nebo upravovat existující.
>
> ### Napojení na databázi
>
> - Vytvořte a spravujte jednoduchou databázi, která bude obsahovat informace o > položkách.
> - Zajistěte, aby přidání nebo úprava položky aktualizovala data v databázi.
>
> ### Ošetření chyb
>
> - Zajistěte, aby aplikace byla ošetřena proti neočekávaným chybám a uživatel byl > informován v případě výskytu chyby.
>
> ### Další rozšíření (volitelné)
>
> - Pokud máte čas a zájem, můžete přidat další funkce, jako je třídění nebo > filtrování položek, možnost odstraňovat položky, vyhledávání atd.
>
> ### Technologie které je nutno použít
>
> - React
> - TypeScript
>
> ### Technologie které rádi uvidíme, ale netrváme na nich
>
> - Prisma
> - PostgreSQL
> - Next.js
> - pnpm

## Installation

```shell
git clone https://github.com/FreeWall/tasker
cd tasker
npm run deploy
```

Server is started on port 3000, visit http://localhost:3000/<br/>
(Postgres DB is hosted and preconfigured on Vercel hosting, credentials in `.env.local`)

### Vercel

Project is deployed on Vercel hosting using Postgres DB: [tasker.michalvanek.cz](https://tasker.michalvanek.cz/)
