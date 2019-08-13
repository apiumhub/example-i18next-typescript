import * as i18n from "i18next";
import * as Backend from "i18next-xhr-backend";
import {Module} from "i18next";

export const initi18Next = (languageFilesUrl: string) => {
    i18n
        .use(<Module><any>Backend)
        .init({
            lng: 'en',
            debug: true,
            backend: {
                loadPath: languageFilesUrl,
                ajax: (url: any, options: any, callback: any, data: any) => {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, false)
                    xhr.send(data)
                    callback(xhr.responseText, xhr);
                }
            }
        });
}
