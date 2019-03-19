"use strict";
let Parsimmon = require("parsimmon");
var Lang = Parsimmon.createLanguage({
  Value: function(r) {
    return Parsimmon.alt(
      r.Enumerate,
      r.Number,
      r.Entity,
      r.List
    );
  },
  Enumerate: function() {
    return Parsimmon.regexp(/[0-9]+\./).map(Number);
  },
  Number: function() {
    return Parsimmon.regexp(/[0-9]+/).map(Number);
  },
  List: function(r) {
    return Parsimmon.string('(')
      .then(r.Value.sepBy(r._))
      .skip(Parsimmon.string(')'));
  },
  Entity: function(){
    return Parsimmon.alt(
      Parsimmon.string('week'),
      Parsimmon.string('month'),
      Parsimmon.string('monday')
      )
  },
  _: function() {
    return Parsimmon.optWhitespace;
  }
});
console.log(Lang.Value.tryParse('(week 2.)'));