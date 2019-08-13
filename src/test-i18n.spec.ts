import {expect} from "chai";

(<any>global).XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
import * as i18n from 'i18next'
import * as Backend from 'i18next-xhr-backend';
import {Observable, Subject} from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/bindNodeCallback';
import {Module} from "i18next";
import {initi18Next} from "./test-i18n";

describe("my first test", () => {
    describe("looked up a translation", () => {
        it("should give the correct literal", (done) => {
            //load the default language, which is in http://127.0.0.1:8080/assets/i18n/en.json:
            console.log(typeof (Backend));
            i18n
                .use(<Module><any>Backend)
                .init({
                    lng: 'en',
                    debug: true,
                    backend: {
                        loadPath: 'http://127.0.0.1:8080/assets/i18n/{{lng}}.json'
                    }
                });
            //switch the language
            i18n.changeLanguage("en", (err: any, data: any) => {
                //once the language has been set, the dictionary is loaded, and it's possible to get the literals all over the app
                const title = i18n.t("title")
                expect(title).to.eql("Translation demo")
                done();
            })
        });

        it("should give the correct literal with Rx Observable", (done) => {
            i18n
                .use(<Module><any>Backend)
                .init({
                    lng: 'en',
                    debug: true,
                    backend: {
                        loadPath: 'http://127.0.0.1:8080/assets/i18n/{{lng}}.json'
                    }
                });
            const changeLanguage = Observable.bindNodeCallback(i18n.changeLanguage.bind(i18n))
            const langChanged: Observable<any[]> = changeLanguage("en")
            langChanged.subscribe(() => {
                const title = i18n.t("title")
                expect(title).to.eql("Translation demo")
                done();
            })
        });
        describe("used in SYNC mode", () => {
            //load the default language, which is in http://127.0.0.1:8080/assets/i18n/en.json:
            //loading sync: Christian comment: an example on how monadic solutions are not practical, while coroutines are
            initi18Next('http://127.0.0.1:8080/assets/i18n/{{lng}}.json');
            //switch the language
            i18n.changeLanguage("en");
            it("should still give the correct literal", (done) => {
                const title = i18n.t("title")
                expect(title).to.eql("Translation demo")
                done();
            });
            it("should give the literal when the key has space", (done) => {
                const title = i18n.t("my title")
                expect(title).to.eql("Translation demo")
                done();
            })
            it('should give back the key when not present', function (done) {
                const theKey = "my title 2"
                const title = i18n.t(theKey)
                expect(title).to.eql(theKey)
                done();
            });
        });
    });
});

