"use strict";



define('timer-app/app', ['exports', 'timer-app/resolver', 'ember-load-initializers', 'timer-app/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('timer-app/components/context-menu', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['context-menu'],

    open: false,

    actions: {
      toggleMenu: function toggleMenu() {
        this.toggleProperty('open');
      }
    }
  });
});
define('timer-app/components/main-nav', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    timer: Ember.inject.service(),

    tagName: 'nav',
    classNames: ['main-nav'],

    minSeconds: Ember.computed.reads('timer.minSeconds'),
    avgSeconds: Ember.computed.reads('timer.avgSeconds'),
    maxSeconds: Ember.computed.reads('timer.maxSeconds'),
    isPaused: Ember.computed.reads('timer.isPaused'),

    actions: {
      resume: function resume() {
        this.get('timer').resume();
      },
      pause: function pause() {
        this.get('timer').pause();
      },
      restart: function restart() {
        this.get('timer').restart();
      }
    }
  });
});
define('timer-app/components/time-picker', ['exports', 'timer-app/utils/parse-time'], function (exports, _parseTime13) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  exports.default = Ember.Component.extend({
    classNames: ['time-picker'],

    showAutoButton: true,

    hours: Ember.computed('time', {
      get: function get() {
        var time = this.get('time') || '';

        var _parseTime = (0, _parseTime13.parseTime)(time),
            _parseTime2 = _slicedToArray(_parseTime, 1),
            hours = _parseTime2[0];

        return hours;
      },
      set: function set(key, value) {
        var _parseTime3 = (0, _parseTime13.parseTime)(this.get('time')),
            _parseTime4 = _slicedToArray(_parseTime3, 3),
            minutes = _parseTime4[1],
            seconds = _parseTime4[2];

        var hours = parseInt(value, 10);
        this.set('time', (0, _parseTime13.joinTimeParts)(hours, minutes, seconds));
        return value;
      }
    }),

    minutes: Ember.computed('time', {
      get: function get() {
        var time = this.get('time') || '';

        var _parseTime5 = (0, _parseTime13.parseTime)(time),
            _parseTime6 = _slicedToArray(_parseTime5, 2),
            minutes = _parseTime6[1];

        return minutes;
      },
      set: function set(key, value) {
        var _parseTime7 = (0, _parseTime13.parseTime)(this.get('time')),
            _parseTime8 = _slicedToArray(_parseTime7, 3),
            hours = _parseTime8[0],
            seconds = _parseTime8[2];

        var minutes = parseInt(value, 10);
        this.set('time', (0, _parseTime13.joinTimeParts)(hours, minutes, seconds));
        return value;
      }
    }),

    seconds: Ember.computed('time', {
      get: function get() {
        var time = this.get('time') || '0';

        var _parseTime9 = (0, _parseTime13.parseTime)(time),
            _parseTime10 = _slicedToArray(_parseTime9, 3),
            seconds = _parseTime10[2];

        return seconds;
      },
      set: function set(key, value) {
        var _parseTime11 = (0, _parseTime13.parseTime)(this.get('time')),
            _parseTime12 = _slicedToArray(_parseTime11, 2),
            hours = _parseTime12[0],
            minutes = _parseTime12[1];

        var seconds = parseInt(value, 10);
        this.set('time', (0, _parseTime13.joinTimeParts)(hours, minutes, seconds));
        return value;
      }
    })
  });
});
define('timer-app/components/timer-display', ['exports', 'timer-app/utils/parse-time'], function (exports, _parseTime) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var floor = Math.floor;
  exports.default = Ember.Component.extend({
    tagName: 'span',
    classNames: ['timer-display'],

    displayTime: Ember.computed('seconds', {
      get: function get() {
        var seconds = this.get('seconds') || 0;
        var minutes = floor(seconds / 60);
        var hours = floor(minutes / 60);
        seconds -= minutes * 60;
        minutes -= hours * 60;
        var time = (0, _parseTime.joinTimeParts)(hours, minutes, seconds);
        return time === 'auto' ? '00:00' : time;
      }
    })
  });
});
define('timer-app/components/top-bar', ['exports', 'timer-app/mixins/timer-class'], function (exports, _timerClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend(_timerClass.default, {
    timer: Ember.inject.service(),

    classNames: ['top-bar'],
    classNameBindings: ['timerClasses'],

    seconds: Ember.computed.reads('timer.seconds'),
    isPaused: Ember.computed.reads('timer.isPaused')
  });
});
define('timer-app/controllers/about', ['exports', 'timer-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    timer: Ember.inject.service(),

    sourceUrl: _environment.default.APP.sourceUrl,
    attributions: _environment.default.APP.attributions,

    minSeconds: Ember.computed.reads('timer.minSeconds'),
    avgSeconds: Ember.computed.reads('timer.avgSeconds'),
    maxSeconds: Ember.computed.reads('timer.maxSeconds')
  });
});
define('timer-app/controllers/application', ['exports', 'timer-app/mixins/timer-class'], function (exports, _timerClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend(_timerClass.default, {
    timer: Ember.inject.service(),
    queryParams: ['min', 'avg', 'max'],

    min: Ember.computed.alias('timer.minTime'),
    avg: Ember.computed.alias('timer.avgTime'),
    max: Ember.computed.alias('timer.maxTime')
  });
});
define('timer-app/controllers/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    timer: Ember.inject.service(),

    isPaused: Ember.computed.reads('timer.isPaused'),
    seconds: Ember.computed.reads('timer.seconds'),

    actions: {
      restart: function restart() {
        this.get('timer').restart();
      },
      pause: function pause() {
        this.get('timer').pause();
      },
      resume: function resume() {
        this.get('timer').resume();
      },
      toggleTimer: function toggleTimer() {
        if (this.get('isPaused')) {
          this.send('resume');
        } else {
          this.send('pause');
        }
      },
      resetAndPause: function resetAndPause() {
        this.send('restart');
        this.send('pause');
      }
    }
  });
});
define('timer-app/controllers/settings', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    timer: Ember.inject.service(),

    minTime: Ember.computed.alias('timer.minTime'),
    avgTime: Ember.computed.alias('timer.avgTime'),
    maxTime: Ember.computed.alias('timer.maxTime'),

    minSeconds: Ember.computed.reads('timer.minSeconds'),
    avgSeconds: Ember.computed.reads('timer.avgSeconds'),
    maxSeconds: Ember.computed.reads('timer.maxSeconds')
  });
});
define('timer-app/helpers/app-version', ['exports', 'timer-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    var versionOnly = hash.versionOnly || hash.hideSha;
    var shaOnly = hash.shaOnly || hash.hideVersion;

    var match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('timer-app/helpers/cancel-all', ['exports', 'ember-concurrency/helpers/cancel-all'], function (exports, _cancelAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
  Object.defineProperty(exports, 'cancelAll', {
    enumerable: true,
    get: function () {
      return _cancelAll.cancelAll;
    }
  });
});
define('timer-app/helpers/perform', ['exports', 'ember-concurrency/helpers/perform'], function (exports, _perform) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
  Object.defineProperty(exports, 'perform', {
    enumerable: true,
    get: function () {
      return _perform.perform;
    }
  });
});
define('timer-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('timer-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('timer-app/helpers/task', ['exports', 'ember-concurrency/helpers/task'], function (exports, _task) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
  Object.defineProperty(exports, 'task', {
    enumerable: true,
    get: function () {
      return _task.task;
    }
  });
});
define('timer-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'timer-app/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('timer-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('timer-app/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('timer-app/initializers/ember-concurrency', ['exports', 'ember-concurrency/initializers/ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.initialize;
    }
  });
});
define('timer-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('timer-app/initializers/ember-keyboard-first-responder-inputs', ['exports', 'ember-keyboard/initializers/ember-keyboard-first-responder-inputs'], function (exports, _emberKeyboardFirstResponderInputs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberKeyboardFirstResponderInputs.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _emberKeyboardFirstResponderInputs.initialize;
    }
  });
});
define('timer-app/initializers/export-application-global', ['exports', 'timer-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('timer-app/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('timer-app/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('timer-app/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("timer-app/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('timer-app/mixins/timer-class', ['exports', 'timer-app/utils/timer-states'], function (exports, _timerStates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _CONTAINER_STATE_CLAS;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var CONTAINER_STATE_CLASSES = (_CONTAINER_STATE_CLAS = {}, _defineProperty(_CONTAINER_STATE_CLAS, _timerStates.default.DEFAULT, '--default-time'), _defineProperty(_CONTAINER_STATE_CLAS, _timerStates.default.MINIMUM, '--min-time'), _defineProperty(_CONTAINER_STATE_CLAS, _timerStates.default.AVERAGE, '--avg-time'), _defineProperty(_CONTAINER_STATE_CLAS, _timerStates.default.MAXIMUM, '--max-time'), _defineProperty(_CONTAINER_STATE_CLAS, _timerStates.default.DISQUALIFIED, '--disqualified-time'), _CONTAINER_STATE_CLAS);

  exports.default = Ember.Mixin.create({
    timer: Ember.inject.service(),

    state: Ember.computed.reads('timer.state'),
    isPaused: Ember.computed.reads('timer.isPaused'),

    timerClasses: Ember.computed('{state,isPaused}', {
      get: function get() {
        var state = this.get('state');
        var classNames = [CONTAINER_STATE_CLASSES[state]];
        if (this.get('isPaused')) {
          classNames.push('--paused');
        }
        return classNames.join(' ');
      }
    })
  });
});
define('timer-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('timer-app/router', ['exports', 'timer-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('about');
    this.route('settings');
  });

  exports.default = Router;
});
define('timer-app/routes/index', ['exports', 'ember-keyboard'], function (exports, _emberKeyboard) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_emberKeyboard.EKMixin, {
    timer: Ember.inject.service(),

    activate: function activate() {
      this._super.apply(this, arguments);
      this.set('keyboardActivated', true);
    },
    deactivate: function deactivate() {
      this._super.apply(this, arguments);
      this.set('keyboardActivated', false);
    },


    toggleTimer: Ember.on((0, _emberKeyboard.keyUp)('Space'), function () {
      var timer = this.get('timer');
      if (timer.get('isPaused')) {
        timer.resume();
      } else {
        timer.pause();
      }
    }),

    resetTimer: Ember.on((0, _emberKeyboard.keyUp)('KeyR'), function () {
      this.get('timer').reset();
    }),

    showHelp: Ember.on((0, _emberKeyboard.keyUp)('KeyH'), (0, _emberKeyboard.keyUp)('shift+Slash'), function () {
      this.transitionTo('about');
    }),

    showSettings: Ember.on((0, _emberKeyboard.keyUp)('KeyS'), function () {
      this.transitionTo('settings');
    })
  });
});
define('timer-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('timer-app/services/keyboard', ['exports', 'ember-keyboard/services/keyboard'], function (exports, _keyboard) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _keyboard.default;
    }
  });
});
define('timer-app/services/timer', ['exports', 'ember-concurrency', 'timer-app/utils/parse-time', 'timer-app/utils/timer-states'], function (exports, _emberConcurrency, _parseTime, _timerStates) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var floor = Math.floor;


  var ONE_MINUTE = 60; // Seconds
  var TWO_MINUTES = 120; // Seconds
  var FIVE_MINUTES = 300; // Seconds
  var DISQUALIFICATION_OFFSET = 30; // Seconds

  exports.default = Ember.Service.extend({
    minTime: 'auto',
    avgTime: 'auto',
    maxTime: '07:00',
    _clockTime: 0,

    isPaused: Ember.computed.reads('clock.isIdle'),

    maxSeconds: Ember.computed('maxTime', {
      get: function get() {
        return (0, _parseTime.parseSeconds)(this.get('maxTime')) || FIVE_MINUTES;
      }
    }),

    minSeconds: Ember.computed('{minTime,maxSeconds}', {
      get: function get() {
        var minTime = this.get('minTime');
        var maxSeconds = this.get('maxSeconds');
        var minSeconds = (0, _parseTime.parseSeconds)(minTime);
        var isManual = minTime !== 'auto' && minSeconds < maxSeconds;
        if (isManual) {
          return minSeconds;
        }
        if (maxSeconds > FIVE_MINUTES) {
          return maxSeconds - TWO_MINUTES;
        }
        if (maxSeconds > TWO_MINUTES) {
          return maxSeconds - ONE_MINUTE;
        }
        if (maxSeconds > ONE_MINUTE) {
          return maxSeconds - 30;
        }
        return 0;
      }
    }),

    avgSeconds: Ember.computed('{avgTime,minSeconds,maxSeconds}', {
      get: function get() {
        var avgTime = this.get('avgTime');
        var minSeconds = this.get('minSeconds');
        var maxSeconds = this.get('maxSeconds');
        var avgSeconds = (0, _parseTime.parseSeconds)(avgTime);
        var isManual = avgTime !== 'auto' && avgSeconds > minSeconds && avgSeconds < maxSeconds;
        if (isManual) {
          return avgSeconds;
        }
        var duration = maxSeconds - minSeconds;
        return floor(duration / 2) + minSeconds;
      }
    }),

    state: Ember.computed('{seconds,minSeconds,avgSeconds,maxSeconds}', {
      get: function get() {
        var seconds = this.get('seconds');
        var minSeconds = this.get('minSeconds');
        var avgSeconds = this.get('avgSeconds');
        var maxSeconds = this.get('maxSeconds');
        var disqualifiedSeconds = maxSeconds + DISQUALIFICATION_OFFSET;
        if (seconds >= disqualifiedSeconds) {
          return _timerStates.default.DISQUALIFIED;
        }
        if (seconds >= maxSeconds) {
          return _timerStates.default.MAXIMUM;
        }
        if (seconds >= avgSeconds) {
          return _timerStates.default.AVERAGE;
        }
        if (seconds >= minSeconds) {
          return _timerStates.default.MINIMUM;
        }
        return _timerStates.default.DEFAULT;
      }
    }),

    seconds: Ember.computed('_clockTime', {
      get: function get() {
        return floor(this.get('_clockTime') / 1000);
      }
    }),

    clock: (0, _emberConcurrency.task)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var initialTime, sTime, cTime, clockTime;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              initialTime = this.get('_clockTime');
              sTime = new Date().getTime();

            case 2:
              if (!true) {
                _context.next = 10;
                break;
              }

              _context.next = 5;
              return (0, _emberConcurrency.timeout)(500);

            case 5:
              cTime = new Date().getTime();
              clockTime = cTime - sTime + initialTime;

              this.set('_clockTime', clockTime);
              _context.next = 2;
              break;

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).restartable(),

    reset: function reset() {
      this.get('clock').cancelAll();
      this.set('_clockTime', 0);
    },
    restart: function restart() {
      this.set('_clockTime', 0);
      this.resume();
    },
    pause: function pause() {
      this.get('clock').cancelAll();
    },
    resume: function resume() {
      this.get('clock').perform();
    }
  });
});
define("timer-app/templates/about", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lMxtRM4C", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"top-bar\"],false],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n  \"],[4,\"link-to\",[\"index\"],[[\"tagName\",\"class\",\"title\"],[\"button\",\"close-button\",\"close\"]],{\"statements\":[[0,\"×\"]],\"parameters\":[]},null],[0,\"\\n\\n  \"],[6,\"h2\"],[7],[0,\"Just A Timer\"],[6,\"sup\"],[9,\"class\",\"small\"],[7],[0,\"™\"],[8],[8],[0,\"\\n  \"],[6,\"dl\"],[9,\"class\",\"info-list\"],[7],[0,\"\\n    \"],[6,\"dt\"],[7],[0,\"Version\"],[8],[0,\"\\n    \"],[6,\"dd\"],[7],[6,\"code\"],[7],[1,[25,\"app-version\",null,[[\"versionOnly\"],[true]]],false],[8],[0,\" (\"],[6,\"code\"],[7],[1,[25,\"app-version\",null,[[\"shaOnly\"],[true]]],false],[8],[0,\")\"],[8],[0,\"\\n    \"],[6,\"dt\"],[7],[0,\"Source\"],[8],[0,\"\\n    \"],[6,\"dd\"],[7],[6,\"a\"],[10,\"href\",[18,\"sourceUrl\"],null],[7],[1,[18,\"sourceUrl\"],false],[8],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"p\"],[7],[0,\"A simple yet useful speech or talk timer that follows the \"],[6,\"a\"],[9,\"href\",\"https://www.toastmasters.org/\"],[7],[0,\"Toastmasters\"],[8],[0,\" recommended timer notifications.\"],[8],[0,\"\\n\\n  \"],[6,\"h3\"],[7],[0,\"Instructions\"],[8],[0,\"\\n  \"],[6,\"p\"],[7],[0,\"The timer will continue to count up. It has three settings that determine when the background color of the timer will change.\"],[8],[0,\"\\n  \"],[6,\"dl\"],[9,\"class\",\"info-list\"],[7],[0,\"\\n    \"],[6,\"dt\"],[7],[0,\"Minimum\"],[8],[0,\"\\n    \"],[6,\"dd\"],[7],[0,\"The time to reach to meet the minimum speech length. Currently set to \"],[1,[25,\"timer-display\",null,[[\"seconds\"],[[20,[\"minSeconds\"]]]]],false],[0,\" (green)\"],[8],[0,\"\\n    \"],[6,\"dt\"],[7],[0,\"Average\"],[8],[0,\"\\n    \"],[6,\"dd\"],[7],[0,\"The time that marks the average speech length. Currently set to \"],[1,[25,\"timer-display\",null,[[\"seconds\"],[[20,[\"avgSeconds\"]]]]],false],[0,\" (yellow)\"],[8],[0,\"\\n    \"],[6,\"dt\"],[7],[0,\"Maximum\"],[8],[0,\"\\n    \"],[6,\"dd\"],[7],[0,\"The time that marks when a speech has run over. Currently set to \"],[1,[25,\"timer-display\",null,[[\"seconds\"],[[20,[\"maxSeconds\"]]]]],false],[0,\" (red)\"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"p\"],[7],[0,\"Clicking on the \"],[4,\"link-to\",[\"index\"],null,{\"statements\":[[0,\"Timer\"]],\"parameters\":[]},null],[0,\" page will pause/resume the timer. Use the \"],[4,\"link-to\",[\"settings\"],null,{\"statements\":[[0,\"Settings\"]],\"parameters\":[]},null],[0,\" page to change the values above. The values are saved to the URL so your favorite timings can be bookmarked.\"],[8],[0,\"\\n\\n  \"],[6,\"h3\"],[7],[0,\"Keyboard Shortcuts\"],[8],[0,\"\\n  \"],[6,\"p\"],[7],[0,\"These keyboard shortcuts are available on the main \"],[4,\"link-to\",[\"index\"],null,{\"statements\":[[0,\"Timer\"]],\"parameters\":[]},null],[0,\" page.\"],[8],[0,\"\\n  \"],[6,\"dl\"],[9,\"class\",\"info-list\"],[7],[0,\"\\n    \"],[6,\"dt\"],[7],[6,\"kbd\"],[7],[0,\"Space\"],[8],[8],[0,\"\\n    \"],[6,\"dd\"],[7],[0,\"Pause/Resume timer\"],[8],[0,\"\\n    \"],[6,\"dt\"],[7],[6,\"kbd\"],[7],[0,\"R\"],[8],[8],[0,\"\\n    \"],[6,\"dd\"],[7],[0,\"Reset the timer\"],[8],[0,\"\\n    \"],[6,\"dt\"],[7],[6,\"kbd\"],[7],[0,\"S\"],[8],[8],[0,\"\\n    \"],[6,\"dd\"],[7],[0,\"Open the \"],[4,\"link-to\",[\"settings\"],null,{\"statements\":[[0,\"Settings\"]],\"parameters\":[]},null],[0,\" page\"],[8],[0,\"\\n    \"],[6,\"dt\"],[7],[6,\"kbd\"],[7],[0,\"H\"],[8],[0,\" or \"],[6,\"kbd\"],[7],[0,\"?\"],[8],[8],[0,\"\\n    \"],[6,\"dd\"],[7],[0,\"Open this page\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "timer-app/templates/about.hbs" } });
});
define("timer-app/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dHyL7U2B", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",[26,[\"container \",[18,\"timerClasses\"]]]],[7],[0,\"\\n  \"],[1,[18,\"outlet\"],false],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "timer-app/templates/application.hbs" } });
});
define("timer-app/templates/components/context-menu", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "AIV6V4Fv", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"button\"],[9,\"class\",\"context-menu__toggle-button\"],[3,\"action\",[[19,0,[]],\"toggleMenu\"]],[7],[0,\"\\n  ☰ \"],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",[26,[\"context-menu__dropdown \",[25,\"if\",[[20,[\"open\"]],\"context-menu--open\"],null]]]],[7],[0,\"\\n  \"],[11,1],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "timer-app/templates/components/context-menu.hbs" } });
});
define("timer-app/templates/components/main-nav", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "d7slgPwu", "block": "{\"symbols\":[],\"statements\":[[6,\"ul\"],[9,\"class\",\"nav-list\"],[7],[0,\"\\n  \"],[6,\"li\"],[9,\"class\",\"item\"],[7],[0,\"\\n\"],[4,\"if\",[[20,[\"isPaused\"]]],null,{\"statements\":[[0,\"      \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"resume\"]],[7],[0,\"Resume\"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      \"],[6,\"button\"],[3,\"action\",[[19,0,[]],\"pause\"]],[7],[0,\"Pause\"],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[8],[0,\"\\n  \"],[6,\"li\"],[9,\"class\",\"item\"],[7],[6,\"button\"],[3,\"action\",[[19,0,[]],\"restart\"]],[7],[0,\"Restart\"],[8],[8],[0,\"\\n  \"],[6,\"li\"],[9,\"class\",\"item\"],[7],[4,\"link-to\",[\"index\"],null,{\"statements\":[[0,\"Timer\"]],\"parameters\":[]},null],[8],[0,\"\\n  \"],[6,\"li\"],[9,\"class\",\"item\"],[7],[4,\"link-to\",[\"settings\"],null,{\"statements\":[[0,\"Settings\"]],\"parameters\":[]},null],[8],[0,\"\\n  \"],[6,\"li\"],[9,\"class\",\"item\"],[7],[4,\"link-to\",[\"about\"],null,{\"statements\":[[0,\"About\"]],\"parameters\":[]},null],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"showDetails\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[9,\"class\",\"item\"],[7],[0,\"Min: \"],[1,[25,\"timer-display\",null,[[\"seconds\"],[[20,[\"minSeconds\"]]]]],false],[8],[0,\"\\n    \"],[6,\"li\"],[9,\"class\",\"item\"],[7],[0,\"Avg: \"],[1,[25,\"timer-display\",null,[[\"seconds\"],[[20,[\"avgSeconds\"]]]]],false],[8],[0,\"\\n    \"],[6,\"li\"],[9,\"class\",\"item\"],[7],[0,\"Max: \"],[1,[25,\"timer-display\",null,[[\"seconds\"],[[20,[\"maxSeconds\"]]]]],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[8]],\"hasEval\":false}", "meta": { "moduleName": "timer-app/templates/components/main-nav.hbs" } });
});
define("timer-app/templates/components/time-picker", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "NgHUALof", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"input\",null,[[\"type\",\"title\",\"max\",\"min\",\"value\"],[\"number\",\"hours\",99,0,[20,[\"hours\"]]]]],false],[0,\"\\n:\\n\"],[1,[25,\"input\",null,[[\"type\",\"title\",\"max\",\"min\",\"value\"],[\"number\",\"minutes\",60,0,[20,[\"minutes\"]]]]],false],[0,\"\\n:\\n\"],[1,[25,\"input\",null,[[\"type\",\"title\",\"max\",\"min\",\"value\"],[\"number\",\"seconds\",60,0,[20,[\"seconds\"]]]]],false],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"showAutoButton\"]]],null,{\"statements\":[[0,\"  \"],[6,\"button\"],[3,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"time\"]]],null],\"auto\"]],[7],[0,\"Auto\"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "timer-app/templates/components/time-picker.hbs" } });
});
define("timer-app/templates/components/timer-display", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ts2ODSpY", "block": "{\"symbols\":[\"&default\"],\"statements\":[[4,\"if\",[[22,1]],null,{\"statements\":[[0,\"  \"],[11,1,[[20,[\"displayTime\"]]]],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[1,[18,\"displayTime\"],false],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "timer-app/templates/components/timer-display.hbs" } });
});
define("timer-app/templates/components/top-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MDGDxYXa", "block": "{\"symbols\":[\"displayTime\"],\"statements\":[[4,\"timer-display\",null,[[\"class\",\"seconds\"],[\"header-timer\",[20,[\"seconds\"]]]],{\"statements\":[[0,\"  \"],[1,[19,1,[]],false],[0,\" \"],[1,[25,\"if\",[[20,[\"isPaused\"]],\"(paused)\"],null],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n\"],[1,[18,\"main-nav\"],false]],\"hasEval\":false}", "meta": { "moduleName": "timer-app/templates/components/top-bar.hbs" } });
});
define("timer-app/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "668AE4O0", "block": "{\"symbols\":[\"displayTime\"],\"statements\":[[4,\"context-menu\",null,null,{\"statements\":[[0,\"  \"],[1,[25,\"main-nav\",null,[[\"showDetails\"],[true]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"main-timer\"],[3,\"action\",[[19,0,[]],\"resetAndPause\"],[[\"on\"],[\"doubleClick\"]]],[3,\"action\",[[19,0,[]],\"toggleTimer\"],[[\"on\"],[\"click\"]]],[7],[0,\"\\n\"],[4,\"timer-display\",null,[[\"class\",\"seconds\"],[\"jumbo\",[20,[\"seconds\"]]]],{\"statements\":[[0,\"    \"],[1,[19,1,[]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "timer-app/templates/index.hbs" } });
});
define("timer-app/templates/settings", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yaQxEcIc", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"top-bar\"],false],[0,\"\\n\\n\"],[6,\"form\"],[9,\"class\",\"content settings-form\"],[7],[0,\"\\n  \"],[4,\"link-to\",[\"index\"],[[\"tagName\",\"class\",\"title\"],[\"button\",\"close-button\",\"close\"]],{\"statements\":[[0,\"×\"]],\"parameters\":[]},null],[0,\"\\n\\n  \"],[6,\"p\"],[9,\"class\",\"description\"],[7],[0,\"\\n  \"],[6,\"em\"],[7],[0,\"Tip:\"],[8],[0,\" After adjusting the times bookmark this URL to save the times for next future uses.\\n  (\"],[4,\"link-to\",[[25,\"query-params\",null,[[\"min\",\"avg\",\"max\"],[\"5:00\",\"8:00\",\"10:00\"]]]],null,{\"statements\":[[0,\"example\"]],\"parameters\":[]},null],[0,\")\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"fieldset\"],[9,\"class\",\"--max-time\"],[7],[0,\"\\n    \"],[6,\"label\"],[7],[0,\"Maximum time \"],[1,[25,\"timer-display\",null,[[\"seconds\"],[[20,[\"maxSeconds\"]]]]],false],[8],[0,\"\\n    \"],[1,[25,\"time-picker\",null,[[\"showAutoButton\",\"time\"],[false,[20,[\"maxTime\"]]]]],false],[0,\"\\n    \"],[6,\"p\"],[9,\"class\",\"description\"],[7],[0,\"Speech has run over time (red).\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"fieldset\"],[9,\"class\",\"--avg-time\"],[7],[0,\"\\n    \"],[6,\"label\"],[7],[0,\"Average time \"],[1,[25,\"timer-display\",null,[[\"seconds\"],[[20,[\"avgSeconds\"]]]]],false],[8],[0,\"\\n    \"],[1,[25,\"time-picker\",null,[[\"time\"],[[20,[\"avgTime\"]]]]],false],[0,\"\\n    \"],[6,\"p\"],[9,\"class\",\"description\"],[7],[0,\"Speech is near going over time (yellow).\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"fieldset\"],[9,\"class\",\"--min-time\"],[7],[0,\"\\n    \"],[6,\"label\"],[7],[0,\"Minimum time \"],[1,[25,\"timer-display\",null,[[\"seconds\"],[[20,[\"minSeconds\"]]]]],false],[8],[0,\"\\n    \"],[1,[25,\"time-picker\",null,[[\"time\"],[[20,[\"minTime\"]]]]],false],[0,\"\\n    \"],[6,\"p\"],[9,\"class\",\"description\"],[7],[0,\"Speech has reached the time to qualify (green).\"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "timer-app/templates/settings.hbs" } });
});
define('timer-app/utils/get-cmd-key', ['exports', 'ember-keyboard/utils/get-cmd-key'], function (exports, _getCmdKey) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _getCmdKey.default;
    }
  });
});
define('timer-app/utils/listener-name', ['exports', 'ember-keyboard/utils/listener-name'], function (exports, _listenerName) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _listenerName.default;
    }
  });
});
define('timer-app/utils/parse-time', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.padNumber = padNumber;
  exports.parseTime = parseTime;
  exports.parseSeconds = parseSeconds;
  exports.joinTimeParts = joinTimeParts;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function padNumber(num) {
    return ('0' + num).substr(-2);
  }

  function parseTime(time) {
    var parts = time.split(':');
    for (; parts.length < 3; parts.unshift('0')) {}
    return parts.map(function (n) {
      return parseInt(n, 10) || 0;
    });
  }

  function parseSeconds(time) {
    var _parseTime = parseTime(time),
        _parseTime2 = _slicedToArray(_parseTime, 3),
        hours = _parseTime2[0],
        minutes = _parseTime2[1],
        seconds = _parseTime2[2];

    return hours * 60 * 60 + minutes * 60 + seconds;
  }

  function joinTimeParts(hours, minutes, seconds) {
    if (hours + minutes + seconds <= 0) {
      return 'auto';
    }
    hours = hours > 0 ? hours : null;
    return [hours, minutes, seconds].compact().map(padNumber).join(':');
  }
});
define('timer-app/utils/timer-states', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    DEFAULT: 'default',
    MINIMUM: 'minimum',
    AVERAGE: 'average',
    MAXIMUM: 'maximum',
    DISQUALIFIED: 'disqualified'
  };
});


define('timer-app/config/environment', [], function() {
  var prefix = 'timer-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("timer-app/app")["default"].create({"sourceUrl":"https://github.com/sukima/timer-app","name":"timer-app","version":"1.1.0+1091f110"});
}
//# sourceMappingURL=timer-app.map
