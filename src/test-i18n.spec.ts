import {expect} from "chai";
(<any>global).XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
import * as i18n from 'i18next'
import * as Backend from 'i18next-xhr-backend';

describe("my first test", () => {
    describe("should", () => {
        it("work", (done) => {
            expect(true).to.be.true
            done();
        })
    })
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
            i18n.changeLanguage("en", (err, data)=>{
                const title = i18n.t("title")
                expect(title).to.eql("Translation demo")
                done();
            })
        });
    });
});

