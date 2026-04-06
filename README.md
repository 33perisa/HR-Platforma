# HR Platforma - Upravljanje kandidatima i veštinama

Ovaj projekat je razvijen kao rešenje za HR platformu koja omogućava praćenje kandidata za posao i njihovih veština.

## Tehnologije

- **Backend:** Java 17, Spring Boot, Spring Data JPA, H2 Database
- **Frontend:** React, Tailwind CSS, Axios, Lucide React
- **Dokumentacija:** Swagger UI (OpenAPI)

## Struktura projekta

- `java-backend/`: Izvorni kod za Spring Boot aplikaciju.
- `src/`: React frontend aplikacija.
- `public/`: Statički resursi za frontend.

## Kako pokrenuti aplikaciju

### 1. Pokretanje Backenda
1. Otvorite folder `java-backend` u vašem IDE-u (IntelliJ IDEA ili Eclipse).
2. Sačekajte da Maven preuzme sve zavisnosti.
3. Pokrenite glavnu klasu `HrPlatformApplication.java`.
4. Backend će biti dostupan na `http://localhost:8080`.
5. Swagger dokumentaciju možete videti na `http://localhost:8080/swagger-ui.html`.

### 2. Pokretanje Frontenda
1. U korenskom folderu projekta otvorite terminal.
2. Pokrenite komandu `npm install` da instalirate potrebne pakete.
3. Pokrenite komandu `npm run dev` da startujete React aplikaciju.
4. Aplikacija će biti dostupna na `http://localhost:3000`.

## Funkcionalnosti

- Dodavanje novih kandidata sa osnovnim informacijama (ime, email, telefon, datum rođenja).
- Dodavanje novih veština u sistem.
- Povezivanje veština sa kandidatima.
- Pretraga kandidata po imenu (case-insensitive).
- Brisanje kandidata iz sistema.
- Real-time ažuriranje liste kandidata.

## Komentar o najzahtevnijem delu zadatka

Najzanimljiviji, a ujedno i najzahtevniji deo zadatka za mene je bio rad sa **Many-to-Many** vezom između entiteta `Candidate` i `Skill`. 

Prvobitno sam razmišljao da veštine budu samo običan niz stringova unutar tabele kandidata, ali sam odlučio da ih implementiram kao poseban entitet. Razlog za ovu odluku je bolja struktura baze podataka – na ovaj način se izbegava dupliranje podataka i omogućava se lakša pretraga kandidata po specifičnim veštinama u budućnosti. 

Najveći izazov je bio pravilno mapiranje ove veze u Spring Boot-u (korišćenjem `@ManyToMany` i `@JoinTable` anotacija) i osiguravanje da se podaci ispravno čuvaju i brišu bez narušavanja integriteta baze. Na frontendu je takođe bilo zanimljivo rešiti dinamičko dodeljivanje veština kandidatima preko padajućeg menija, gde se nakon svakog dodeljivanja lista odmah osvežava bez ponovnog učitavanja cele stranice.
