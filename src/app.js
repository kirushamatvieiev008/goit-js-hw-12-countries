import { alert, defaultModules, error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/BrightTheme.css";
import debounce from "lodash.debounce";

import fetchCountries from "./fetchcountries";


defaultModules.set(PNotifyMobile, {});

const inp = document.querySelector('input');
const list = document.querySelector('.js-list');
const box = document.querySelector('.box');

const searchCountries = (event) => {
    list.innerHTML = '';
    const countryname = event.target.value.trim();
    fetchCountries(countryname).then(res => {
        if (res.length > 10) {
            error({
                text: "зробіть запит більш специфічним",
                delay: 2000,
            });
            return
        }
        if (res.length <= 10 && res.length >= 2) {
            list.innerHTML = '';
            const countries = res.map(country => {

                return `<li>${country.name.common}</li>`
            }).join('')
            list.innerHTML = countries;
        }
        if (res.length === 1) {
            list.innerHTML = '';
            const countries = res.map(country => {
                return `<li>
                <p>name: ${country.name.common}</p>
    
                </li>`
            })
        }
    })
}

inp.addEventListener('input', debounce(searchCountries, 500));

// error({
//   text: "Notice me, hero!",
// });