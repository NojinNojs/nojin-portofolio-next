const obfuscator = require("javascript-obfuscator");
const _js = require("terser");
const _css = require("csso");

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const fs = require("fs");

(async () => {
  const prettyByte = (await import("pretty-bytes")).default;

  console.log("==================================================");
  console.log("= NextJS MiniCator - Created by Hexaa Scoooolzs");
  console.log("= A tool for obfuscating & minifying NextJS files");
  console.log("=");
  console.log("= Starting to Obfuscate...");
  console.log("==================================================");

  glob("./.next/**/*.js").then(async (datas) => {
    /** @type {Array<{ data: string, byte: number, val: string }>} */
    const dataSorted = await (async () => {
      const size = await Promise.all(
        datas.map((val) => {
          const data = fs.readFileSync(val, "utf-8");
          const byte = prettyByte(new TextEncoder().encode(data).length);
          return {
            data,
            byte,
            val,
          };
        }),
      );

      const sort = size.sort((a, b) => {
        return a.byte - b.byte;
      });

      return sort;
    })();

    const list = await Promise.all(
      dataSorted.map((value) => {
        let byteBefore;
        let byteAfter;

        try {
          byteBefore = prettyByte(new TextEncoder().encode(value.data).length);

          const obfuscated = obfuscator.obfuscate(value.data).getObfuscatedCode();
          byteAfter = prettyByte(new TextEncoder().encode(obfuscated).length);
          fs.writeFileSync(value.val, obfuscated);
        } catch (err) {
          console.log(`X Obfuscator Errored! - ${value.val}`);
          console.log(`X ${byteBefore}`);
          console.log(err);
          console.log("");
          return false;
        }

        console.log(`+ Obfuscator Completed! - ${value.val}`);
        console.log(`+ ${byteBefore} -> ${byteAfter}`);
        console.log(``);

        return true;
      }),
    );

    let obfuscateSuccess = list.filter((data) => data === true).length;
    let obfuscateUnsuccess = list.filter((data) => data === false).length;
    let obfuscateTotal = list.length;

    console.log("");
    console.log("==================================================");
    console.log("= Obfuscating Completed!");
    console.log("=");
    console.log(
      `= Total      : ${obfuscateTotal} ${obfuscateTotal > 1 ? "files" : "file"}`,
    );
    console.log(
      `= Success    : ${obfuscateSuccess} ${obfuscateSuccess > 1 ? "files" : "file"}`,
    );
    console.log(
      `= Unsuccess  : ${obfuscateUnsuccess} ${obfuscateUnsuccess > 1 ? "files" : "file"}`,
    );
    console.log("=");
    console.log("= Starting Minifying JS File...");
    console.log("==================================================");

    const minifierJSList = await Promise.all(
      dataSorted.map(async (value) => {
        let byteBefore;
        let byteAfter;

        try {
          byteBefore = prettyByte(new TextEncoder().encode(value.data).length);

          const obfuscated = (await _js.minify(value.data)).code;
          byteAfter = prettyByte(new TextEncoder().encode(obfuscated).length);
          fs.writeFileSync(value.val, obfuscated);
        } catch (err) {
          console.log(`X JSMinifyer Errored! - ${value.val}`);
          console.log(`X ${byteBefore}`);
          console.log(err);
          console.log("");

          return false;
        }

        console.log(`+ JSMinifyer Completed! - ${value.val}`);
        console.log(`+ ${byteBefore} -> ${byteAfter}`);
        console.log(``);

        return true;
      }),
    );

    const minifyJSSuccess = minifierJSList.filter((data) => data === true).length;
    const minifyJSUnsuccess = minifierJSList.filter(
      (data) => data === false,
    ).length;
    const minifyJSTotal = minifierJSList.length;

    console.log("");
    console.log("==================================================");
    console.log("= Minifying JS Completed!");
    console.log("=");
    console.log(
      `= Total      : ${minifyJSTotal} ${minifyJSTotal > 1 ? "files" : "file"}`,
    );
    console.log(
      `= Success    : ${minifyJSSuccess} ${minifyJSSuccess > 1 ? "files" : "file"}`,
    );
    console.log(
      `= Unsuccess  : ${minifyJSUnsuccess} ${minifyJSUnsuccess > 1 ? "files" : "file"}`,
    );
    console.log("=");
    console.log("= Starting Minifying CSS File...");
    console.log("==================================================");

    const cssList = await glob("./.next/**/*.css");
    /** @type {Array<{ data: string, byte: number, val: string }>} */
    const cssSorted = await (async () => {
      const size = await Promise.all(
        cssList.map((val) => {
          const data = fs.readFileSync(val, "utf-8");
          const byte = prettyByte(new TextEncoder().encode(data).length);
          return {
            data,
            byte,
            val,
          };
        }),
      );

      const sort = size.sort((a, b) => {
        return a.byte - b.byte;
      });

      return sort;
    })();

    const minifierCSSList = await Promise.all(
      cssSorted.map(async (value) => {
        let byteBefore;
        let byteAfter;

        try {
          byteBefore = prettyByte(new TextEncoder().encode(value.data).length);

          const obfuscated = (await _css.minify(value.data)).css;
          byteAfter = prettyByte(new TextEncoder().encode(obfuscated).length);
          fs.writeFileSync(value.val, obfuscated);
        } catch (err) {
          console.log(`X CSSMinifyer Errored! - ${value.val}`);
          console.log(`X ${byteBefore}`);
          console.log(err);
          console.log("");

          return false;
        }

        console.log(`+ CSSMinifyer Completed! - ${value.val}`);
        console.log(`+ ${byteBefore} -> ${byteAfter}`);
        console.log(``);

        return true;
      }),
    );

    const minifyCSSSuccess = minifierCSSList.filter(
      (data) => data === true,
    ).length;
    const minifyCSSUnsuccess = minifierCSSList.filter(
      (data) => data === false,
    ).length;
    const minifyCSSTotal = minifierCSSList.length;

    console.log("");
    console.log("==================================================");
    console.log("= Minifying CSS Completed!");
    console.log("=");
    console.log(
      `= Total      : ${minifyCSSTotal} ${minifyCSSTotal > 1 ? "files" : "file"}`,
    );
    console.log(
      `= Success    : ${minifyCSSSuccess} ${minifyCSSSuccess > 1 ? "files" : "file"}`,
    );
    console.log(
      `= Unsuccess  : ${minifyCSSUnsuccess} ${minifyCSSUnsuccess > 1 ? "files" : "file"}`,
    );
    console.log("==================================================");

    console.log("\n\n");
    console.log("==================================================");
    console.log("= NextJS MiniCator - Created by Hexaa Scoooolzs");
    console.log("= A tool for obfuscating & minifying NextJS files");
    console.log("=");
    console.log("= Completed!");
    console.log("=");
    console.log(
      `= JS Obfuscator = ${obfuscateSuccess}/${obfuscateTotal} (${Math.round(
        (obfuscateSuccess / obfuscateTotal) * 100,
      )}% Completed)`,
    );
    console.log(
      `= JS Minifier   = ${minifyJSSuccess}/${minifyJSTotal} (${Math.round(
        (minifyJSSuccess / minifyJSTotal) * 100,
      )}% Completed)`,
    );
    console.log(
      `= CSS Minifier  = ${minifyCSSSuccess}/${minifyCSSTotal} (${Math.round(
        (minifyCSSSuccess / minifyCSSTotal) * 100,
      )}% Completed)`,
    );
    console.log("==================================================");
  });
})();
