import {expect} from "chai";

(<any>global).XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
import * as i18n from 'i18next'
import * as Backend from 'i18next-xhr-backend';
import {Observable, Subject} from 'rxjs';
import {map, take} from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/bindNodeCallback';
import Observer = Rx.Observer;

describe("my first test", () => {
    describe("looked up a translation", () => {
        it("should give the correct literal", (done) => {
            i18n
                .use(Backend)
                .init({
                    lng: 'en',
                    debug: true,
                    backend: {
                        loadPath: 'http://127.0.0.1:8080/assets/i18n/{{lng}}.json'
                    }
                });
            i18n.changeLanguage("en", (err, data) => {
                const title = i18n.t("title")
                expect(title).to.eql("Translation demo")
                done();
            })
        });

        it("should give the correct literal with Rx Observable", (done) => {
            i18n
                .use(Backend)
                .init({
                    lng: 'en',
                    debug: true,
                    backend: {
                        loadPath: 'http://127.0.0.1:8080/assets/i18n/{{lng}}.json'
                    }
                });
            const changeLanguage = Observable.bindNodeCallback(i18n.changeLanguage.bind(i18n))
            const langChanged = changeLanguage("en")
            langChanged.subscribe(() => {
                const title = i18n.t("title")
                expect(title).to.eql("Translation demo")
                done();
            })
        });
    });
});

