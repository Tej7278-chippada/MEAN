/*
 * $Id: combinatorics.js,v 0.25 2013/03/11 15:42:14 dankogai Exp dankogai $
 *
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  References:
 *    http://www.ruby-doc.org/core-2.0/Array.html#method-i-combination
 *    http://www.ruby-doc.org/core-2.0/Array.html#method-i-permutation
 *    http://en.wikipedia.org/wiki/Factorial_number_system
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Combinatorics = factory();
  }
}(this, () => {
  const version = '0.5.4';
  /* combinatory arithmetics */
  const P = function (m, n) {
    if (n % 1 !== 0) throw new RangeError();
    let p = 1;
    while (n--) p *= m--;
    return p;
  };
  const C = function (m, n) {
    if (n > m) {
      return 0;
    }
    return P(m, n) / P(n, n);
  };
  const factorial = function (n) {
    return P(n, n);
  };
  const factoradic = function (n, d) {
    let f = 1;
    if (!d) {
      for (d = 1; f < n; f *= ++d);
      if (f > n) f /= d--;
    } else {
      f = factorial(d);
    }
    const result = [0];
    for (; d; f /= d--) {
      result[d] = Math.floor(n / f);
      n %= f;
    }
    return result;
  };
    /* common methods */
  const addProperties = function (dst, src) {
    Object.keys(src).forEach((p) => {
      Object.defineProperty(dst, p, {
        value: src[p],
        configurable: p == 'next',
      });
    });
  };
  const hideProperty = function (o, p) {
    Object.defineProperty(o, p, {
      writable: true,
    });
  };
  const toArray = function (f) {
    let e; const
      result = [];
    this.init();
    while (e = this.next()) result.push(f ? f(e) : e);
    this.init();
    return result;
  };
  const common = {
    toArray,
    map: toArray,
    forEach(f) {
      let e;
      this.init();
      while (e = this.next()) f(e);
      this.init();
    },
    filter(f) {
      let e; const
        result = [];
      this.init();
      while (e = this.next()) if (f(e)) result.push(e);
      this.init();
      return result;
    },
    find(f) {
      let e; let
        result;
      this.init();
      while (e = this.next()) {
        if (f(e)) {
          result = e;
          break;
        }
      }
      this.init();
      return result;
    },
    lazyMap(f) {
      this._lazyMap = f;
      return this;
    },
    lazyFilter(f) {
      Object.defineProperty(this, 'next', {
        writable: true,
      });
      if (typeof f !== 'function') {
        this.next = this._next;
      } else {
        if (typeof (this._next) !== 'function') {
          this._next = this.next;
        }
        const _next = this._next.bind(this);
        this.next = (function () {
          let e;
          while (e = _next()) {
            if (f(e)) return e;
          }
          return e;
        });
      }
      Object.defineProperty(this, 'next', {
        writable: false,
      });
      return this;
    },

  };
    /* power set */
  const power = function (ary, fun) {
    const size = 1 << ary.length;
    const sizeOf = function () {
      return size;
    };
    const that = Object.create(ary.slice(), {
      length: {
        get: sizeOf,
      },
    });
    hideProperty(that, 'index');
    addProperties(that, {
      valueOf: sizeOf,
      init() {
        that.index = 0;
      },
      nth(n) {
        if (n >= size) return;
        let i = 0;
        const result = [];
        for (; n; n >>>= 1, i++) if (n & 1) result.push(this[i]);
        return (typeof (that._lazyMap) === 'function') ? that._lazyMap(result) : result;
      },
      next() {
        return this.nth(this.index++);
      },
    });
    addProperties(that, common);
    that.init();
    return (typeof (fun) === 'function') ? that.map(fun) : that;
  };
    /* combination */
  const nextIndex = function (n) {
    const smallest = n & -n;
    const ripple = n + smallest;
    const new_smallest = ripple & -ripple;
    const ones = ((new_smallest / smallest) >> 1) - 1;
    return ripple | ones;
  };
  const combination = function (ary, nelem, fun) {
    if (!nelem) nelem = ary.length;
    if (nelem < 1) throw new RangeError();
    if (nelem > ary.length) throw new RangeError();
    const first = (1 << nelem) - 1;
    const size = C(ary.length, nelem);
    const maxIndex = 1 << ary.length;
    const sizeOf = function () {
      return size;
    };
    const that = Object.create(ary.slice(), {
      length: {
        get: sizeOf,
      },
    });
    hideProperty(that, 'index');
    addProperties(that, {
      valueOf: sizeOf,
      init() {
        this.index = first;
      },
      next() {
        if (this.index >= maxIndex) return;
        let i = 0;
        let n = this.index;
        const result = [];
        for (; n; n >>>= 1, i++) {
          if (n & 1) result[result.length] = this[i];
        }

        this.index = nextIndex(this.index);
        return (typeof (that._lazyMap) === 'function') ? that._lazyMap(result) : result;
      },
    });
    addProperties(that, common);
    that.init();
    return (typeof (fun) === 'function') ? that.map(fun) : that;
  };
    /* bigcombination */
  const bigNextIndex = function (n, nelem) {
    const result = n;
    let j = nelem;
    var i = 0;
    for (i = result.length - 1; i >= 0; i--) {
      if (result[i] == 1) {
        j--;
      } else {
        break;
      }
    }
    if (j == 0) {
      // Overflow
      result[result.length] = 1;
      for (let k = result.length - 2; k >= 0; k--) {
        result[k] = (k < nelem - 1) ? 1 : 0;
      }
    } else {
      // Normal

      // first zero after 1
      let i1 = -1;
      let i0 = -1;
      for (var i = 0; i < result.length; i++) {
        if (result[i] == 0 && i1 != -1) {
          i0 = i;
        }
        if (result[i] == 1) {
          i1 = i;
        }
        if (i0 != -1 && i1 != -1) {
          result[i0] = 1;
          result[i1] = 0;
          break;
        }
      }

      j = nelem;
      for (var i = result.length - 1; i >= i1; i--) {
        if (result[i] == 1) j--;
      }
      for (var i = 0; i < i1; i++) {
        result[i] = (i < j) ? 1 : 0;
      }
    }

    return result;
  };
  const buildFirst = function (nelem) {
    const result = [];
    for (let i = 0; i < nelem; i++) {
      result[i] = 1;
    }
    result[0] = 1;
    return result;
  };
  const bigCombination = function (ary, nelem, fun) {
    if (!nelem) nelem = ary.length;
    if (nelem < 1) throw new RangeError();
    if (nelem > ary.length) throw new RangeError();
    const first = buildFirst(nelem);
    const size = C(ary.length, nelem);
    const maxIndex = ary.length;
    const sizeOf = function () {
      return size;
    };
    const that = Object.create(ary.slice(), {
      length: {
        get: sizeOf,
      },
    });
    hideProperty(that, 'index');
    addProperties(that, {
      valueOf: sizeOf,
      init() {
        this.index = first.concat();
      },
      next() {
        if (this.index.length > maxIndex) return;
        let i = 0;
        const n = this.index;
        const result = [];
        for (let j = 0; j < n.length; j++, i++) {
          if (n[j]) result[result.length] = this[i];
        }
        bigNextIndex(this.index, nelem);
        return (typeof (that._lazyMap) === 'function') ? that._lazyMap(result) : result;
      },
    });
    addProperties(that, common);
    that.init();
    return (typeof (fun) === 'function') ? that.map(fun) : that;
  };
    /* permutation */
  const _permutation = function (ary) {
    const that = ary.slice();
    const size = factorial(that.length);
    that.index = 0;
    that.next = function () {
      if (this.index >= size) return;
      const copy = this.slice();
      const digits = factoradic(this.index, this.length);
      const result = [];
      let i = this.length - 1;
      for (; i >= 0; --i) result.push(copy.splice(digits[i], 1)[0]);
      this.index++;
      return (typeof (that._lazyMap) === 'function') ? that._lazyMap(result) : result;
    };
    return that;
  };
    // which is really a permutation of combination
  const permutation = function (ary, nelem, fun) {
    if (!nelem) nelem = ary.length;
    if (nelem < 1) throw new RangeError();
    if (nelem > ary.length) throw new RangeError();
    const size = P(ary.length, nelem);
    const sizeOf = function () {
      return size;
    };
    const that = Object.create(ary.slice(), {
      length: {
        get: sizeOf,
      },
    });
    hideProperty(that, 'cmb');
    hideProperty(that, 'per');
    addProperties(that, {
      valueOf() {
        return size;
      },
      init() {
        /* combination can only be used for less than 31 elements */
        if (ary.length < 31) {
          this.cmb = combination(ary, nelem);
        } else {
          this.cmb = bigCombination(ary, nelem);
        }

        this.per = _permutation(this.cmb.next());
      },
      next() {
        const result = this.per.next();
        if (!result) {
          const cmb = this.cmb.next();
          if (!cmb) return;
          this.per = _permutation(cmb);
          return this.next();
        }
        return (typeof (that._lazyMap) === 'function') ? that._lazyMap(result) : result;
      },
    });
    addProperties(that, common);
    that.init();
    return (typeof (fun) === 'function') ? that.map(fun) : that;
  };

  const PC = function (m) {
    let total = 0;
    for (let n = 1; n <= m; n++) {
      const p = P(m, n);
      total += p;
    }
    return total;
  };
    // which is really a permutation of combination
  const permutationCombination = function (ary, fun) {
    // if (!nelem) nelem = ary.length;
    // if (nelem < 1) throw new RangeError;
    // if (nelem > ary.length) throw new RangeError;
    const size = PC(ary.length);
    const sizeOf = function () {
      return size;
    };
    const that = Object.create(ary.slice(), {
      length: {
        get: sizeOf,
      },
    });
    hideProperty(that, 'cmb');
    hideProperty(that, 'per');
    hideProperty(that, 'nelem');
    addProperties(that, {
      valueOf() {
        return size;
      },
      init() {
        this.nelem = 1;
        // console.log("Starting nelem: " + this.nelem);
        this.cmb = combination(ary, this.nelem);
        this.per = _permutation(this.cmb.next());
      },
      next() {
        const result = this.per.next();
        if (!result) {
          let cmb = this.cmb.next();
          if (!cmb) {
            this.nelem++;
            // console.log("increment nelem: " + this.nelem + " vs " + ary.length);
            if (this.nelem > ary.length) return;
            this.cmb = combination(ary, this.nelem);
            cmb = this.cmb.next();
            if (!cmb) return;
          }
          this.per = _permutation(cmb);
          return this.next();
        }
        return (typeof (that._lazyMap) === 'function') ? that._lazyMap(result) : result;
      },
    });
    addProperties(that, common);
    that.init();
    return (typeof (fun) === 'function') ? that.map(fun) : that;
  };
    /* Cartesian Product */
  const arraySlice = Array.prototype.slice;
  const cartesianProduct = function () {
    if (!arguments.length) throw new RangeError();
    const args = arraySlice.call(arguments);
    const size = args.reduce((p, a) => p * a.length, 1);
    const sizeOf = function () {
      return size;
    };
    const dim = args.length;
    const that = Object.create(args, {
      length: {
        get: sizeOf,
      },
    });
    if (!size) throw new RangeError();
    hideProperty(that, 'index');
    addProperties(that, {
      valueOf: sizeOf,
      dim,
      init() {
        this.index = 0;
      },
      get() {
        if (arguments.length !== this.length) return;
        const result = [];
        let d = 0;
        for (; d < dim; d++) {
          const i = arguments[d];
          if (i >= this[d].length) return;
          result.push(this[d][i]);
        }
        return (typeof (that._lazyMap) === 'function') ? that._lazyMap(result) : result;
      },
      nth(n) {
        const result = [];
        let d = 0;
        for (; d < dim; d++) {
          const l = this[d].length;
          const i = n % l;
          result.push(this[d][i]);
          n -= i;
          n /= l;
        }
        return (typeof (that._lazyMap) === 'function') ? that._lazyMap(result) : result;
      },
      next() {
        if (this.index >= size) return;
        const result = this.nth(this.index);
        this.index++;
        return result;
      },
    });
    addProperties(that, common);
    that.init();
    return that;
  };
    /* baseN */
  const baseN = function (ary, nelem, fun) {
    if (!nelem) nelem = ary.length;
    if (nelem < 1) throw new RangeError();
    const base = ary.length;
    const size = Math.pow(base, nelem);
    const sizeOf = function () {
      return size;
    };
    const that = Object.create(ary.slice(), {
      length: {
        get: sizeOf,
      },
    });
    hideProperty(that, 'index');
    addProperties(that, {
      valueOf: sizeOf,
      init() {
        that.index = 0;
      },
      nth(n) {
        if (n >= size) return;
        const result = [];
        for (let i = 0; i < nelem; i++) {
          const d = n % base;
          result.push(ary[d]);
          n -= d; n /= base;
        }
        return (typeof (that._lazyMap) === 'function') ? that._lazyMap(result) : result;
      },
      next() {
        return this.nth(this.index++);
      },
    });
    addProperties(that, common);
    that.init();
    return (typeof (fun) === 'function') ? that.map(fun) : that;
  };

  /* export */
  const Combinatorics = Object.create(null);
  addProperties(Combinatorics, {
    C,
    P,
    factorial,
    factoradic,
    cartesianProduct,
    combination,
    bigCombination,
    permutation,
    permutationCombination,
    power,
    baseN,
    VERSION: version,
  });
  return Combinatorics;
}));
