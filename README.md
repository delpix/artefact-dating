# Artefact Dating — PWA

A Progressive Web App that estimates the age of an archaeological artefact
through an **interactive binary search**: the user answers a series of
Yes / No questions and the app converges rapidly on the estimated date.

---

## How it works

1. **Enter an initial estimate** of the artefact's age in years (10 – 4,500,000,000).
2. The app asks: *"Is the artefact less than X years old?"*
   - **Yes** — the current value is confirmed as the upper bound and the binary search begins.
   - **No** — the estimate is doubled and the question is repeated.
3. Once the search interval starts, each Yes / No answer halves the remaining range.
4. The search stops automatically when the interval width falls within the **resolution threshold** for the age cluster:

   | Estimated age (years)         | Resolution  |
   |-------------------------------|-------------|
   | 10 – 10,000                   | 10 yrs      |
   | 10,001 – 100,000              | 100 yrs     |
   | 100,001 – 1,000,000           | 1,000 yrs   |
   | 1,000,001 – 100,000,000       | 10,000 yrs  |
   | 100,000,001 – 4,500,000,000   | 100,000 yrs |

5. The result is displayed rounded down to the nearest multiple of the resolution,
   together with the total number of questions asked.

The app works fully **offline** after the first load, thanks to the Service Worker cache.

---

## Installation on a mobile device

### Android (Chrome or Edge)

1. Open your browser and navigate to the app URL:
   `https://delpix.github.io/artefact-dating/`
2. Tap the browser menu (⋮ top-right corner).
3. Select **"Add to Home screen"** (or **"Install app"**).
4. Confirm by tapping **Add** / **Install**.
5. The app icon will appear on your Home screen and works like a native app.

### iOS (Safari)

1. Open **Safari** and navigate to the app URL:
   `https://delpix.github.io/artefact-dating/`
2. Tap the **Share** button (□↑ bottom centre).
3. Scroll down and tap **"Add to Home Screen"**.
4. Confirm by tapping **Add** (top-right corner).
5. The app icon will appear on your Home screen.

> **Note:** on iOS the app must be installed via Safari.
> Chrome and other browsers on iOS do not support PWA installation.

## Licence

The content of this project is licensed under a Creative Commons 4.0 - Attribution-NonCommercial-NoDerivs [CC BY-NC-ND] - Unported License (all jurisdictions).

If you want remix, adapt, and build upon this work, and although your new works must acknowledge authors and be non-commercial, you can obtain the license Attribution-NonCommercial [CC BY-NC] with a bit PayPal donation.

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate?business=XQJ7ZSZMW8V3N&currency_code=EUR)

---

*Artefact Dating · PWA · v1.1*