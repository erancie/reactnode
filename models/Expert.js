const mongoose = require('mongoose');

'use strict';
const autoBind = require('auto-bind');

class Expert {
  constructor(name){
    this.name = name;
    autoBind(this);
  }
}

module.exports = Expert;