define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],

        moduleId: './modules/home',

        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        baseUrl: "http://localhost:5000/api",
        loginUrl: '/users/login',
        tokenName: 'token',
        authHeader: 'Authorization',
        authToken: '',
        logoutRedirect: '#/home'
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'regenerator-runtime', './auth-config'], function (exports, _environment, _regeneratorRuntime, _authConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;
  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.users = users;
      this.message = 'Home';
      this.showLogin = true;
    }

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.registerError = "";

      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(this.user);
                _context.next = 3;
                return this.users.save(this.user);

              case 3:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('list');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    return Home;
  }()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', '../resources/data/gallery', 'aurelia-auth', '../resources/data/picList', 'aurelia-router'], function (exports, _aureliaFramework, _gallery, _aureliaAuth, _picList, _aureliaRouter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.List = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _gallery.Gallery, _aureliaAuth.AuthService, _picList.Pics), _dec(_class = function () {
		function List(router, gallery, auth, mypics) {
			_classCallCheck(this, List);

			this.mypics = mypics;
			this.router = router;
			this.message = 'List';
			this.auth = auth;
			this.gallery = gallery;
			this.user = JSON.parse(sessionStorage.getItem('user'));
			this.showList = 'galleryList';
		}

		List.prototype.activate = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.gallery.getUserGallery(this.user._id);

							case 2:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function activate() {
				return _ref.apply(this, arguments);
			}

			return activate;
		}();

		List.prototype.back = function back() {
			this.showList = 'galleryList';
		};

		List.prototype.createGallery = function createGallery() {
			this.galleryObj = {
				userId: this.user._id,
				gallery: "",
				description: ""
			};
			this.showList = 'galleryForm';
		};

		List.prototype.saveGallery = function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
				var response, galleryId;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (!this.galleryObj) {
									_context2.next = 14;
									break;
								}

								_context2.next = 3;
								return this.gallery.save(this.galleryObj);

							case 3:
								response = _context2.sent;

								if (!response.error) {
									_context2.next = 8;
									break;
								}

								alert("There was an error creating the Gallery");
								_context2.next = 14;
								break;

							case 8:
								galleryId = response._id;

								if (!(this.filesToUpload && this.filesToUpload.length)) {
									_context2.next = 13;
									break;
								}

								_context2.next = 12;
								return this.gallery.uploadFile(this.filesToUpload, this.user._id, galleryId);

							case 12:
								this.filesToUpload = [];

							case 13:
								this.showList = 'galleryList';

							case 14:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function saveGallery() {
				return _ref2.apply(this, arguments);
			}

			return saveGallery;
		}();

		List.prototype.saveMyPics = function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
				var mypicsObj, response, galleryId;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								mypicsObj = { gallery: this.galleryObj._id };
								_context3.next = 3;
								return this.mypics.save(mypicsObj);

							case 3:
								response = _context3.sent;

								if (!response.error) {
									_context3.next = 8;
									break;
								}

								alert("There was an error saving pics");
								_context3.next = 14;
								break;

							case 8:
								galleryId = response._id;

								if (!(this.filesToUpload && this.filesToUpload.length)) {
									_context3.next = 13;
									break;
								}

								_context3.next = 12;
								return this.mypics.uploadFile(this.filesToUpload, this.user._id, galleryId);

							case 12:
								this.filesToUpload = [];

							case 13:
								this.showList = 'picList';

							case 14:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function saveMyPics() {
				return _ref3.apply(this, arguments);
			}

			return saveMyPics;
		}();

		List.prototype.editGallery = function editGallery(gallery) {

			this.galleryObj = gallery;
			this.showList = 'galleryForm';
		};

		List.prototype.editMyPic = function () {
			var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(gallery) {
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return this.mypics.getGalleryPics(gallery._id);

							case 2:
								this.galleryObj = gallery;
								this.showList = 'picList';

							case 4:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function editMyPic(_x) {
				return _ref4.apply(this, arguments);
			}

			return editMyPic;
		}();

		List.prototype.deleteGallery = function deleteGallery(gallery) {
			this.gallery.deleteGallery(gallery._id);
		};

		List.prototype.deleteGalleryPics = function deleteGalleryPics(id) {
			this.mypics.deleteGalleryPics(id);
		};

		List.prototype.changeFiles = function changeFiles() {
			this.filesToUpload = new Array();
			this.filesToUpload.push(this.files[0]);
		};

		List.prototype.removeFile = function removeFile(index) {
			this.filesToUpload.splice(index, 1);
		};

		List.prototype.logout = function logout() {
			sessionStorage.removeItem('user');
			this.auth.logout();
		};

		return List;
	}()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DataServices = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
		function DataServices(http) {
			var _this = this;

			_classCallCheck(this, DataServices);

			this.httpClient = http;

			this.BASE_URL = "http://localhost:5000/api/";

			this.httpClient.configure(function (config) {
				config.withBaseUrl(_this.BASE_URL).withDefaults({
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'X-Requested-With': 'Fetch'
					}
				}).withInterceptor({
					request: function request(_request) {
						var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');
						_request.headers.append('Authorization', authHeader);
						console.log('Requesting ' + _request.method + ' ' + _request.url);
						return _request;
					},
					response: function response(_response) {
						console.log('Received ' + _response.status + ' ' + _response.url);
						return _response;
					}
				});
			});
		}

		DataServices.prototype.get = function get(url) {
			return this.httpClient.fetch(url).then(function (response) {
				return response.json();
			}).then(function (data) {
				return data;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.post = function post(content, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.put = function put(content, url) {
			return this.httpClient.fetch(url, {
				method: 'put',
				body: (0, _aureliaFetchClient.json)(content)
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.delete = function _delete(url) {
			return this.httpClient.fetch(url, {
				method: 'delete'
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
			return this.httpClient.fetch(url, {
				method: 'post',
				body: files
			}).then(function (response) {
				return response.json();
			}).then(function (object) {
				return object;
			}).catch(function (error) {
				return error;
			});
		};

		return DataServices;
	}()) || _class);
});
define('resources/data/gallery',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Gallery = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Gallery = exports.Gallery = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Gallery(data) {
            _classCallCheck(this, Gallery);

            this.data = data;
            this.GALLERY_SERVICE = 'gallery';
            this.galleryArray = [];
        }

        Gallery.prototype.getUserGallery = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.GALLERY_SERVICE + "/user/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.galleryArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUserGallery(_x) {
                return _ref.apply(this, arguments);
            }

            return getUserGallery;
        }();

        Gallery.prototype.deleteGallery = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
                var response, i;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.data.delete(this.GALLERY_SERVICE + "/" + id);

                            case 2:
                                response = _context2.sent;

                                if (!response.error) {
                                    for (i = 0; i < this.galleryArray.length; i++) {
                                        if (this.galleryArray[i]._id === id) {
                                            this.galleryArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function deleteGallery(_x2) {
                return _ref2.apply(this, arguments);
            }

            return deleteGallery;
        }();

        Gallery.prototype.save = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(gallery) {
                var serverResponse, response;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!gallery) {
                                    _context3.next = 14;
                                    break;
                                }

                                if (gallery._id) {
                                    _context3.next = 9;
                                    break;
                                }

                                _context3.next = 4;
                                return this.data.post(gallery, this.GALLERY_SERVICE);

                            case 4:
                                serverResponse = _context3.sent;

                                if (!serverResponse.error) {
                                    this.galleryArray.push(serverResponse);
                                }
                                return _context3.abrupt('return', serverResponse);

                            case 9:
                                _context3.next = 11;
                                return this.data.put(gallery, this.GALLERY_SERVICE + "/" + gallery._id);

                            case 11:
                                response = _context3.sent;

                                if (!response.error) {}
                                return _context3.abrupt('return', response);

                            case 14:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function save(_x3) {
                return _ref3.apply(this, arguments);
            }

            return save;
        }();

        return Gallery;
    }()) || _class);
});
define('resources/data/picList',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Pics = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Pics = exports.Pics = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Pics(data) {
            _classCallCheck(this, Pics);

            this.data = data;
            this.PIC_SERVICE = 'pics';
            this.picArray = [];
        }

        Pics.prototype.getGalleryPics = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.PIC_SERVICE + "/user/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.picArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getGalleryPics(_x) {
                return _ref.apply(this, arguments);
            }

            return getGalleryPics;
        }();

        Pics.prototype.deleteGalleryPics = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
                var response, i;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.data.delete(this.PIC_SERVICE + "/user/gallery" + id);

                            case 2:
                                response = _context2.sent;

                                if (!response.error) {
                                    for (i = 0; i < this.picArray.length; i++) {
                                        if (this.picArray[i]._id === id) {
                                            this.picArray.splice(i, 1);
                                        }
                                    }
                                }

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function deleteGalleryPics(_x2) {
                return _ref2.apply(this, arguments);
            }

            return deleteGalleryPics;
        }();

        Pics.prototype.uploadFile = function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(files, userId, galleryId) {
                var formData, response;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                formData = new FormData();

                                files.forEach(function (item, index) {
                                    formData.append("file" + index, item);
                                });
                                _context3.next = 4;
                                return this.data.uploadFiles(formData, this.PIC_SERVICE + "/upload/" + userId + "/" + galleryId);

                            case 4:
                                response = _context3.sent;
                                return _context3.abrupt('return', response);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function uploadFile(_x3, _x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return uploadFile;
        }();

        Pics.prototype.save = function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(pics) {
                var serverResponse, response;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (!pics) {
                                    _context4.next = 14;
                                    break;
                                }

                                if (pics._id) {
                                    _context4.next = 9;
                                    break;
                                }

                                _context4.next = 4;
                                return this.data.post(pics, this.PIC_SERVICE);

                            case 4:
                                serverResponse = _context4.sent;

                                if (!serverResponse.error) {
                                    this.picArray.push(serverResponse);
                                }
                                return _context4.abrupt('return', serverResponse);

                            case 9:
                                _context4.next = 11;
                                return this.data.put(pics, this.PIC_SERVICE + "/" + gallery._id);

                            case 11:
                                response = _context4.sent;

                                if (!response.error) {}
                                return _context4.abrupt('return', response);

                            case 14:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function save(_x6) {
                return _ref4.apply(this, arguments);
            }

            return save;
        }();

        return Pics;
    }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;
            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ""; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template>    <compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose>    <compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template>    <h1>${message}</h1>    <compose show.bind=\"showList === 'galleryList'\" view=\"./components/galleryList.html\"></compose>    <compose show.bind=\"showList === 'galleryForm'\" view=\"./components/galleryForm.html\"></compose><compose show.bind=\"showList === 'picList'\" view=\"./components/picList.html\"></compose>    <compose show.bind=\"!showList\" view=\"./components/galleryForm.html\"></compose></template>"; });
define('text!modules/components/galleryForm.html', ['module'], function(module) { module.exports = "<template><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><form><div class=\"form-group\"><input value.bind=\"galleryObj.gallery\" type=\"text\" class=\"form-control\" id=\"galleryInput\" aria-describedby=\"galleryHelp\" placeholder=\"Enter Gallery\"> <small id=\"galleryHelp\" class=\"form-text text-muted\">Enter a name for your Gallery.</small></div>        <div class=\"form-group\">            <textarea value.bind=\"galleryObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Description\"></textarea>             <small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if desired.</small>         </div>          <button click.trigger=\"saveGallery()\" class=\"btn btn-primary topMargin\">Save</button>     </form></template>"; });
define('text!modules/components/galleryList.html', ['module'], function(module) { module.exports = "<template>    <div class=\"card topMargin\">        <div class=\"card-body\"><div class=\"row\">                <span class=\"col\">                    <span class=\"leftMargin pull-left\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i></span>                     <span class=\"leftMargin pull-left\"><i click.trigger=\"createGallery()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span>                 </span>            </div>            <div show.bind=\"gallery.galleryArray.length\"><table class=\"table\"><thead><tr><th>Gallery</th><th>Edit/Delete/Maintain Pics</th></tr></thead><tbody><tr repeat.for=\"gallery of gallery.galleryArray\"><td>${gallery.gallery}</td><td><i click.trigger=\"editGallery(gallery)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i>     <i click.trigger=\"deleteGallery(gallery)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i> <i click.trigger=\"editMyPic(gallery)\" class=\"fa fa-picture-o rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!gallery.galleryArray.length\"><h2>Apparently, you don't have any galleries!</h2></div>    </div>    </div></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div><div class=\"card\"><div class=\"card-body\"><label>MyPics</label></div></div><div class=\"card\"><div class=\"card-body\">    <label for=\"email\">Email</label>     <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Email\">    <label for=\"password\">Password</label>     <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></div></div><div class=\"card\"><div class=\"card-body\"><button click.trigger=\"login()\">Login</button>        <button click.trigger=\"showRegister()\">Register</button></div></div><template></template></template>"; });
define('text!modules/components/picList.html', ['module'], function(module) { module.exports = "<template><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span> <button click.trigger=\"saveMyPics()\" class=\"btn btn-primary topMargin\">Save</button></div></div><div class=\"row\"><div class=\"col\"><label class=\"btn btn-secondary\">Add Pic to gallery&hellip; <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label></div><div class=\"col-8\"><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div></div><div show.bind=\"mypics.picArray.length\"><table class=\"table\"><thead><tr><th>mypics</th><th>Edit</th><th>Delete</th></tr></thead><tbody><tr repeat.for=\"mypics of mypics.picArray.length\"><td><img src=\"http://localhost:5000/uploads/${user._id}/${mypics.file.filename}\" target=\"_blank\">${mypics.file.originalName}</td><td><label class=\"btn btn-secondary\">Edit Pic Location&hellip; <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label></td>   <td><i click.trigger=\"deleteGalleryPics(pic)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><div class=\"form-group 1\" ; text-align: justify>  First Name: <input value.bind=\"user.firstName\"></div><div class=\"form-group 2\" ; text-align: justify> Last Name: <input value.bind=\"user.lastName\"></div><div class=\"form-group 3\" ; text-align: justify> Email: <input value.bind=\"user.email\"></div><div class=\"form-group 4\" ; text-align: justify> Password: <input value.bind=\"user.password\"></div>     <button click.trigger=\"save()\">Save</button></template>"; });
//# sourceMappingURL=app-bundle.js.map