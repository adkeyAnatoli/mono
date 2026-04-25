export type UiPhraseLanguage = 'en' | 'el';

export type UiPhrases = {
  languageName: string;
  claimBonus: string;
  topGames: string;
  topCasinos: string;
  playNow: string;
  allGames: string;
  welcomeBonus: string;
  exclusiveWelcomeOfferOf: string;
  exclusiveWelcomeBonusOf: string;
  showMore: string;
  showLess: string;
  previousGames: string;
  nextGames: string;
  swipeToChangeGamePage: string;
  gamePages: string;
  page: string;
  logo: string;
  notFoundPageMissing: string;
  notFoundPageMoved: string;
  homePage: string;
};

export const uiPhrasesByLanguage: Record<UiPhraseLanguage, UiPhrases> = {
  en: {
    languageName: 'English',
    claimBonus: 'Claim Bonus',
    topGames: 'Top Games',
    topCasinos: 'Top Casinos',
    playNow: 'Play Now',
    allGames: 'All Games',
    welcomeBonus: 'Welcome Bonus',
    exclusiveWelcomeOfferOf: 'Exclusive welcome offer of',
    exclusiveWelcomeBonusOf: 'Exclusive welcome bonus of',
    showMore: 'Show More',
    showLess: 'Show Less',
    previousGames: 'Previous games',
    nextGames: 'Next games',
    swipeToChangeGamePage: 'Swipe to change game page',
    gamePages: 'Game pages',
    page: 'Page',
    logo: 'Logo',
    notFoundPageMissing: 'The page you were looking for does not exist.',
    notFoundPageMoved:
      'You may have mistyped the address or the page may have moved.',
    homePage: 'Home Page',
  },
  el: {
    languageName: 'Greek',
    claimBonus: 'Διεκδικήστε μπόνους',
    topGames: 'Κορυφαία παιχνίδια',
    topCasinos: 'Κορυφαία καζίνο',
    playNow: 'Παίξτε τώρα',
    allGames: 'Όλα τα παιχνίδια',
    welcomeBonus: 'Δώρο Εγγραφής',
    exclusiveWelcomeOfferOf: 'Αποκλειστική προσφορά καλωσορίσματος',
    exclusiveWelcomeBonusOf: 'Αποκλειστικό μπόνους καλωσορίσματος',
    showMore: 'Εμφάνιση περισσότερων',
    showLess: 'Εμφάνιση λιγότερων',
    previousGames: 'Προηγούμενα παιχνίδια',
    nextGames: 'Επόμενα παιχνίδια',
    swipeToChangeGamePage: 'Σύρετε για αλλαγή σελίδας παιχνιδιών',
    gamePages: 'Σελίδες παιχνιδιών',
    page: 'Σελίδα',
    logo: 'Λογότυπο',
    notFoundPageMissing: 'Η σελίδα που αναζητάτε δεν υπάρχει.',
    notFoundPageMoved:
      'Ίσως πληκτρολογήσατε λάθος τη διεύθυνση ή η σελίδα έχει μετακινηθεί.',
    homePage: 'Αρχική σελίδα',
  },
};

export const uiPhrases = uiPhrasesByLanguage.el;
