
// to use shareyourpaper, just include this js file, and then call shareyourpaper() in a script on the page
// If jquery is not already used on the site, jquery is retrieved too.
// bootstrap can optionally be used to apply styling
// <script src="https://openaccessbutton.org/static/shareyourpaper.js"></script>
// <script>jQuery(document).ready(function() { shareyourpaper(); });</script>

var _oab_opts = {};
var _oab_config = {};
var _ops = ['doi','title','url','atitle','rft_id','journal','issn','year','author'];
var _parameta = {};
var _lib_contact = undefined;

var _config = function() {
  jQuery(document).ready(function(){
    var api = _oab_opts.api ? _oab_opts.api : 'https://api.openaccessbutton.org';
    if (_oab_opts.uid) {
      $.ajax({
        type:'GET',
        url:api+'/deposit/config?uid='+_oab_opts.uid,
        success: function(data) {
          _oab_config = data;
          _run();
        },
        error: function() {
          _run();
        }
      });
    } else {
      _run();
    }
  });
}

var _run = function() {
  var cml = _oab_config.problem_email ? _oab_config.problem_email : (_oab_config.email ? _oab_config.email : (_oab_config.adminemail ? _oab_config.adminemail : undefined));
  _lib_contact = 'Please try ' + (cml ? '<a href="mailto:' + cml + '">contacting your library</a>' : 'contacting your library') + ' directly';
  if (_oab_opts.bootstrap === undefined) _oab_opts.bootstrap = 'btn btn-primary btn-iu';
  if (_oab_opts.placeholder === undefined) _oab_opts.placeholder = 'e.g. 10.1234/567890';
  if (_oab_opts.data === undefined) _oab_opts.data = false;
  var api = _oab_opts.api ? _oab_opts.api : 'https://api.openaccessbutton.org';
  var site = _oab_opts.site ? _oab_opts.site : 'https://openaccessbutton.org';
  if (window.location.host.indexOf('dev.openaccessbutton.org') !== -1) {
    if (!_oab_opts.api) api = 'https://dev.api.cottagelabs.com/service/oab';
    if (!_oab_opts.site) site = 'https://dev.openaccessbutton.org';
  }
  if (_oab_opts.element === undefined) _oab_opts.element = '#shareyourpaper';
  if (_oab_opts.uid === undefined) _oab_opts.uid = 'anonymous';
  if ($(_oab_opts.element).length === 0) $('body').append('<div id="shareyourpaper"></div>');

  var w = '<div id="oabutton_inputs"><h2>Make your research visible and see 30% more citations</h2>';
  w += '<p>Share your paper with help from the library in ScholarWorks. Legally, for free, in minutes. Join millions of researchers sharing their papers freely with colleagues and the public.</p>';
  w += '<h3>Start by entering the DOI of your paper</h3>';
  w += '<p>We\'ll gather information about your paper and find the easiest way to share it.</p>';
  w += '<p><input class="oabutton_form' + (_oab_opts.bootstrap !== false ? ' form-control' : '') + '" type="text" id="oabutton_input" placeholder="' + _oab_opts.placeholder + '" aria-label="' + _oab_opts.placeholder + '" style="box-shadow:none;"></input></p>\
  <p><a class="oabutton_find ' + (_oab_opts.bootstrap !== false ? (typeof _oab_opts.bootstrap === 'string' ? _oab_opts.bootstrap : 'btn btn-primary') : '') + '" href="#" id="oabutton_find" aria-label="Search" style="min-width:150px;">Next</a></p>';
  w += '\
</div>\
<div id="oabutton_availability"></div>\
<div id="oabutton_error" style="display:none;"></div>';

  var ws = '#oabutton_inputs {\
  position: relative;\
  display: table;\
  width:100%;\
  border-collapse: separate;\
}\
.oabutton_form {\
  /*display: inline-block;\
  width: 100%;*/\
  height: 34px;\
  padding: 6px 12px;\
  font-size: 16px;\
  line-height: 1.428571429;\
  color: #555555;\
  vertical-align: middle;\
  background-color: #ffffff;\
  background-image: none;\
  border: 1px solid #cccccc;\
  border-radius: 4px;\
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\
          transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\
}\
#oabutton_find {\
  /*display: table-cell;\
  width:40px;*/\
  height:34px;\
  padding: 6px 3px;\
  margin-bottom: 0;\
  font-size: 14px;\
  font-weight: normal;\
  line-height: 1.428571429;\
  text-align: center;\
  white-space: nowrap;\
  vertical-align: middle;\
  cursor: pointer;\
  background-image: none;\
  border: 1px solid transparent;\
  border-radius: 0px 4px 4px 0px;\
  -webkit-user-select: none;\
     -moz-user-select: none;\
      -ms-user-select: none;\
       -o-user-select: none;\
          user-select: none;\
  color: #ffffff;\
  background-color: #428bca;\
  border-color: #357ebd;\
}\
.oabutton_deposit {\
  /*display: inline-block;*/\
  height:34px;\
  padding: 6px 3px;\
  margin-bottom: 0;\
  font-size: 14px;\
  font-weight: normal;\
  line-height: 1.428571429;\
  text-align: center;\
  white-space: nowrap;\
  vertical-align: middle;\
  cursor: pointer;\
  background-image: none;\
  border: 1px solid transparent;\
  border-radius: 4px;\
  -webkit-user-select: none;\
     -moz-user-select: none;\
      -ms-user-select: none;\
       -o-user-select: none;\
          user-select: none;\
  color: #ffffff;\
  background-color: #428bca;\
  border-color: #357ebd;\
}';

  if (_oab_opts.bootstrap !== false) {
    var bs = true;
    $('body').append('<div class="btn" id="oabutton_bootstrap_test" style="display:none;"></div>');
    if ( $('#oabutton_bootstrap_test').css('height') !== '0px' ) bs = false;
    $('#oabutton_bootstrap_test').remove();
    if (bs) {
      var bs = document.createElement("link");
      bs.setAttribute("rel", "stylesheet");
      bs.setAttribute("type", "text/css");
      bs.setAttribute("href", site + '/static/bootstrap.min.css');
      document.getElementsByTagName("head")[0].appendChild(bs);
    }
  }
  if (_oab_opts.css) {
    w = '<style>' + (typeof _oab_opts.css === 'string' ? _oab_opts.css : ws) + '</style>' + w;
  }
  $(_oab_opts.element).html(w);

  var matched = false;
  var avail = undefined;
  var attempts = 0;
  var gotmore = false;

  _restart = function(e) {
    try { e.preventDefault(); } catch(err) {}
    matched = false;
    avail = undefined;
    attempts = 0;
    gotmore = false;
    if (_oab_opts.uid) {
      $.ajax({
        type:'GET',
        url:api+'/deposit/config?uid='+_oab_opts.uid,
        success: function(data) {
          _oab_config = data;
        }
      });
    }
    $('#oabutton_availability').html('').hide();
    $('#oabutton_find').html('Next');
    $('#oabutton_input').val('');
    $('#oabutton_inputs').show();
  }

  var pinger = function(what) {
    try {
      var noddy_api = api.indexOf('dev.') !== -1 ? 'https://dev.api.cottagelabs.com' : 'https://api.cottagelabs.com';
      var url = noddy_api + '/ping.png?service=openaccessbutton&action=' + what + '&from=' + _oab_opts.uid;
      if (_oab_config.pilot) url += '&pilot=' + _oab_config.pilot;
      if (_oab_config.live) url += '&pilot=' + _oab_config.live;
      $.ajax({
        url: url
      });
    } catch (err) {}
  }

  var fail = function(info) {
    if (info === undefined) {
      info = '<h3>Unknown paper</h3><p>Sorry, we cannot find this paper or sufficient metadata. ' + _lib_contact + '</p>';
      pinger('Shareyourpaper_unknown_article');
    }
    $('#oabutton_inputs').hide();
    $('#oabutton_availability').html(info).show();
    setTimeout(_restart, 6000);
  }

  var getmore = function(e) {
    try { e.preventDefault(); } catch(err) {}
    if (attempts > 2) {
      fail();
    } else {
      attempts += 1;
      var info = '<div>';
      info += '<p>Sorry we didn\'t find that paper! Can you please provide or amend the paper details?</p>';
      info += '<p>Paper title (required)<br><input class="oabutton_form' + (_oab_opts.bootstrap !== false ? ' form-control' : '') + '" id="oabutton_title" type="text"></p>';
      info += '<p>Author(s)<br><input class="oabutton_form' + (_oab_opts.bootstrap !== false ? ' form-control' : '') + '" id="oabutton_author" type="text"></p>';
      info += '<p>Journal title (required)<br><input class="oabutton_form' + (_oab_opts.bootstrap !== false ? ' form-control' : '') + '" id="oabutton_journal" type="text"></p>';
      info += '<p>Year of publication (required)<br><input class="oabutton_form' + (_oab_opts.bootstrap !== false ? ' form-control' : '') + '" id="oabutton_year" type="text"></p>';
      info += '<p>Paper DOI or URL<br><input class="oabutton_form' + (_oab_opts.bootstrap !== false ? ' form-control' : '') + '" id="oabutton_doi" type="text"></p>';
      info += '<p><a href="#" class="oabutton_find ' + (_oab_opts.bootstrap !== false ? (typeof _oab_opts.bootstrap === 'string' ? _oab_opts.bootstrap : 'btn btn-primary') : '') + '" id="oabutton_find" style="min-width:150px;">Continue</a></p>';
      info += '<p><a href="#" class="restart" style="font-weight:bold;">Try again</a></p>';
      info += '</div>';
      $('#oabutton_availability').html(info);
      gotmore = true;
      try {
        for ( var m in avail.data.meta.article ) {
          try {
            if ( $('#oabutton_'+m).length ) {
              var mv = avail.data.meta.article[m];
              if (m === 'journal' && mv.indexOf('(') !== -1) mv = mv.split('(')[0].trim();
              if (m === 'author' && typeof mv !== 'string') {
                var smv = '';
                for ( var a in mv ) {
                  if (mv[a].fullName) {
                    if (smv !== '') smv += ', ';
                    smv += mv[a].fullName;
                  } else if (mv[a].family) {
                    if (smv !== '') smv += ', ';
                    smv += mv[a].family;
                    if (mv[a].given) smv += ' ' + mv[a].given;
                  }
                }
                mv = smv;
              }
              $('#oabutton_'+m).val(mv);
            }
          } catch(err) {}
        }
      } catch(err) {}
    }
  }

  var cite = function(meta) {
    var c = '';
    // if we got nothing back but what we put in, then we have not found anything suitable :(
    if (meta.year || meta.journal || meta.volume || meta.issue) {
      if (meta.title) c += '<h2>' + meta.title + '</h2>';
      c += '<p><b style="color:#666;">';
      if (meta.year) c += '' + meta.year + (meta.journal || meta.volume || meta.issue ? ', ' : '');
      if (meta.journal) {
        c+= meta.journal;
      } else {
        if (meta.volume) c += 'vol. ' + meta.volume;
        if (meta.issue) c += (meta.volume ? ', ' : '') + 'issue ' + meta.issue;
      }
      c += '</b></p>';
    }
    return c;
  }

  var flupload = undefined;
  var _submit_deposit = function() {
    // this could be just an email for a dark deposit, or a file for actual deposit
    // for file deposit will need file deposit js
    $('.oabutton_find').html('Submitting .');
    $('.oabutton_deposit').html('Depositing .');
    var eml = typeof matched === 'string' ? matched : $('#oabutton_email').val();
    var data = {email:eml, from:_oab_opts.uid, plugin:'shareyourpaper', embedded:window.location.href, metadata: avail.data.meta.article }
    if (avail.v2 && avail.v2.url) data.redeposit = avail.v2.url;
    if (_oab_config.pilot) data.pilot = _oab_config.pilot;
    if (_oab_config.live) data.live = _oab_config.live;
    if (!data.metadata.title || !data.metadata.journal) {
      matched = data.email;
      if (!matched) matched = true;
      getmore();
    } else {
      var opts = {
        type:'POST',
        url:api+'/deposit' + (avail.v2 && avail.v2.catalogue ? '/' + avail.v2.catalogue : ''),
        cache: false,
        processData: false,
        success: function(res) {
          flupload = undefined;
          $('.oabutton_deposit').html('Submit deposit');
          $('#oabutton_availability').html('<h3>Congrats, you\'re done!</h3><p>Check back soon to see your paper live, or we\'ll email you with issues.</p><p><a href="#" class="restart ' + (_oab_opts.bootstrap !== false ? (typeof _oab_opts.bootstrap === 'string' ? _oab_opts.bootstrap : 'btn btn-primary') : '') + '" style="min-width:150px;">Do another</a></p>').show();
        },
        error: function(data) {
          flupload = undefined;
          $('.oabutton_deposit').html('Complete deposit');
          $('#oabutton_error').html('<p>Sorry, we were not able to deposit this paper for you. ' + _lib_contact + '</p><p><a href="#" class="restart" style="font-weight:bold;">Try again</a></p>').show();
          pinger('Shareyourpaper_couldnt_submit_deposit');
        }
      }
      if (flupload) {
        for ( var d in data ) flupload.append(d,data[d]);
        opts.data = flupload;
        opts.contentType = false;
      } else {
        opts.data = JSON.stringify(data);
        opts.contentType = 'application/json';
        opts.dataType = 'json';
      }
      $.ajax(opts);
    }
  }
  var deposit = function(e) {
    try { e.preventDefault(); } catch (err) {}
    $('.oabutton_deposit').html('Depositing .');
    if ($('#file').length) {
      flupload = new FormData();
      flupload.append('file',$('#file')[0].files[0]);
    }
    if ($('#oabutton_email').length) {
      if (!$('#oabutton_email').val().length) {
        $('.oabutton_deposit').html('Complete deposit');
        $('#oabutton_error').html('<p>Please provide your university email address.</p>').show();
        $('#oabutton_email').css('border-color','#f04717').focus();
        return;
      } else {
        $.ajax({
          url: api + '/validate?uid=' + _oab_opts.uid + '&email=' + $('#oabutton_email').val() + '&domained=' + _oab_opts.uid,
          type: 'POST',
          success: function(data) {
            if (data === true) {
              _submit_deposit();
            } else {
              if (data === 'baddomain') {
                $('#oabutton_error').html('<p>Sorry, your email does not belong to the institutional domain. Please try again with your institutional email address.</p>').show();
              } else {
                $('#oabutton_error').html('<p>Sorry, your email does not look right. ' + (data !== false ? 'Did you mean ' + data + '? ' : '') + 'Please check and try again.</p>').show();
              }
              $('.oabutton_deposit').html('Complete deposit');
            }
          },
          error: function(data) {
            _submit_deposit();
          }
        });
      }
    } else {
      var info = '<div>';
      info += '<h3>Nearly there! We\'ll double check your paper</h3>';
      info += '<p>We\'ll do that in the next day to make sure it\'s legal to share.</p>';
      info += '<p><input class="oabutton_form' + (_oab_opts.bootstrap !== false ? ' form-control' : '') + '" type="text" id="oabutton_email" placeholder="email@montana.edu" aria-label="email@montana.edu" style="box-shadow:none;"></input></p>';
      info += '<p>We\'ll only use this to send you a link or questions.</p>';
      info += '<p><a target="_blank" href="#" class="oabutton_deposit ' + (_oab_opts.bootstrap !== false ? (typeof _oab_opts.bootstrap === 'string' ? _oab_opts.bootstrap : 'btn btn-primary') : '') + '" style="min-width:150px;">Submit</a></p>';
      info += '</div>';
      $('#oabutton_availability').html(info).show();
      if (_parameta.email) $('#oabutton_email').val(_parameta.email);//.trigger('keyup'); // should this just auto trigger as well?
    }
  }
  
  var forcedeposit = false;
  var opendeposit = function(e) {
    e.preventDefault();
    forcedeposit = true;
    inform();
  }

  var inform = function() {
    $('#oabutton_inputs').hide();
    $('#oabutton_error').html('').hide();
    var info = '';
    if (avail.data.meta && avail.data.meta.article) {
      var cit = cite(avail.data.meta.article);
      if (cit.length < 1) {
        if (attempts === 0) {
          attempts = 1;
          getmore();
        } else if (!gotmore) {
          fail();
        }
      }
    }
    var needmore = true;
    if (!forcedeposit && avail.data.availability && avail.data.availability.length && avail.data.availability[0].url) {
      // if there is an oa article show a link to it
      needmore = false;
      info += '<div>';
      info += '<h2>Your paper is already freely available!</h2>';
      info += '<p>Congrats, you\'re already getting the benefits of sharing your work.</p>';
      info += '<p><a target="_blank" href="' + avail.data.availability[0].url  + '" class="' + (_oab_opts.bootstrap !== false ? (typeof _oab_opts.bootstrap === 'string' ? _oab_opts.bootstrap : 'btn btn-primary') : '') + '" style="min-width:150px;">View paper</a></p>';
      info += '<p><a href="#" class="oabutton_opendeposit"><b>I still want it in ScholarWorks</b></a></p>';
      info += '</div>';
    } else if (!forcedeposit && avail.v2 && avail.v2.permissions && avail.v2.permissions.acceptable) {
      // can be shared, depending on permissions info that may soon be changing
      needmore = false;
      info += '<div>';
      info += '<h2>You can freely share your paper now!</h2>';
      info += '<p>To enable colleagues and the public to freely download and cite your paper the library has checked and the journal encourages you to freely share a version of the article.</p>';
      info += '<h3>Find the version that was accepted. It\'s usually not a PDF</h3>';
      info += '<p>This is the only version you\'re able to share legally. The accepted version, or \'post-print\', is what you sent to publisher after peer-review and acceptance but before formatting. Often, it\'s a docx or latex export, not publisher proofs.</p>';
      info += '<h3>Check there isn\'t publisher branding or typesetting</h3>';
      info += '<p>It\'s normal to share accepted versions as the research is the same, and we\'ll link to the final published pdf for those who can pay for it. It\'s fine to make small edits to formatting, remove comments, arrange figures etc.</p>';
      info += '<h3>We\'ll check the version, then preserve, and promote your work</h3>';
      info += '<p>It\'s normal to share accepted versions as the research is the same. It\'s fine to make small edits to formatting, remove comments, etc.</p>';
      //info += '<form id="oabfileupload" enctype="multipart/form-data" method="POST"> \
      info += '<p><input type="file" name="file" id="file" class="oabutton_form' + (_oab_opts.bootstrap !== false ? ' form-control' : '') + '"></p>';// \
        //<input type="hidden" name="service" value="openaccessbutton">';
      info += '<p>By uploading you\'re agreeing to the terms and conditions and to license your work CC-BY on Zenodo and ScholarWorks</p>';
      info += '<p><a href="#" class="oabutton_deposit ' + (_oab_opts.bootstrap !== false ? (typeof _oab_opts.bootstrap === 'string' ? _oab_opts.bootstrap : ' btn btn-primary') : '') + '" id="submitfile" style="min-width:150px;">Submit deposit</a>';
      //info += '<p><input type="submit" class="oabutton_deposit ' + (_oab_opts.bootstrap !== false ? (typeof _oab_opts.bootstrap === 'string' ? _oab_opts.bootstrap : ' btn btn-primary') : '') + '" id="submitfile" value="Submit deposit" style="min-width:150px;">';
      //info += '</form>';
      info += '</div>';
    } else {
      // can't be directly shared but can be passed to library for dark deposit
      needmore = false;
      info += '<div>';
      info += '<h2>You can share your paper!</h2>';
      if (!forcedeposit) {
        info += '<p>We checked and unfortunately the journal won\'t let you share this paper freely with everyone.';
        info += 'The good news is the library can legally make your paper much easier to find, access and share by putting the publisher PDF ';
        info += 'in ScholarWorks and we\'ll then share it on your behalf whenever it is requested.</p>';
      }
      info += '<h3>All we need is your email</h3>';
      info += '<p><input class="oabutton_form' + (_oab_opts.bootstrap !== false ? ' form-control' : '') + '" type="text" id="oabutton_email" placeholder="email@montana.edu" aria-label="email@montana.edu" style="box-shadow:none;"></input></p>';
      info += '<p>We\'ll only use this to send you a link to your paper when it is in ScholarWorks.';
      info += 'By submitting, you\'re agreeing to the terms and conditions.</p>';
      info += '<p><a target="_blank" href="#" class="oabutton_deposit ' + (_oab_opts.bootstrap !== false ? (typeof _oab_opts.bootstrap === 'string' ? _oab_opts.bootstrap : 'btn btn-primary') : '') + '" style="min-width:150px;">Submit</a></p>';
      info += '</div>';
    }
    forcedeposit = false;
    $('#oabutton_inputs').hide();
    $('#oabutton_availability').html(info).show();
    if ($('#oabutton_getmore').length && (needmore || (cit && cit.length === 0))) getmore();
    if (_parameta.email && $('#oabutton_email').length) $('#oabutton_email').val(_parameta.email);//.trigger('keyup'); // should this just auto trigger as well?
  }

  var _doing_availability = false;
  var _intervaled = false;
  var availability = function(e) {
    if (!_doing_availability && ($(this).attr('id') === 'oabutton_find' || e === undefined || e.keyCode === 13)) {
      _doing_availability = true;
      $('#oabutton_error').html('').hide();
      if (e && $(this).attr('id') === 'oabutton_find') e.preventDefault();
      var input = $('#oabutton_input').val().trim();
      if (input.lastIndexOf('.') === input.length-1) input = input.substring(0,input.length-1);
      var data = {};
      if ($('#oabutton_title').length) {
        if ($('#oabutton_title').val()) data.title = $('#oabutton_title').val();
        if ($('#oabutton_author').length && $('#oabutton_author').val()) data.author = $('#oabutton_author').val();
        if ($('#oabutton_journal').length && $('#oabutton_journal').val()) data.journal = $('#oabutton_journal').val();
        if ($('#oabutton_year').length && $('#oabutton_year').val()) data.year = $('#oabutton_year').val();
        if ($('#oabutton_doi').length && $('#oabutton_doi').val()) data.doi = $('#oabutton_doi').val();
        if (data.year && data.year.length !== 4) {
          $('#oabutton_error').html('<p>Please provide the full year e.g 2019</p>').show();
          return;
        }
        if (!data.title || !data.journal || !data.year) {
          $('#oabutton_error').html('<p>Please complete all required fields</p>').show();
          return;
        }
      }
      if (JSON.stringify(_parameta) !== '{}') {
        for ( var p in _parameta) {
          if (!data.title && ['title','atitle'].indexOf(p) !== -1) data.title = _parameta[p];
          if (!data.author && ['author'].indexOf(p) !== -1) data.author = _parameta[p];
          if (!data.journal && ['journal','title'].indexOf(p) !== -1) data.journal = _parameta[p];
          if (!data.year && ['year'].indexOf(p) !== -1) data.year = _parameta[p];
          if (!data.doi && ['doi','rft_id'].indexOf(p) !== -1) data.doi = _parameta[p];
          if (!data.issn && ['issn'].indexOf(p) !== -1) data.issn = _parameta[p]; // we don't actually usually pass issn, but grab it anyway
        }
      }
      if (matched) {
        for ( var d in data ) {
          if (data[d] && (avail.data.meta.article[d] === undefined || avail.data.meta.article[d] ==='')) avail.data.meta.article[d] = data[d]
        }
        _submit_deposit();
        return;
      }
      if (data.doi && data.doi.indexOf('10.') === -1 && (data.doi.indexOf('/') === -1 || data.doi.indexOf('http') === 0)) {
        data.url = data.doi;
        delete data.doi;
      }
      if (!input || !input.length) input = data.title;
      if (input === undefined || !input.length || (input.toLowerCase().indexOf('http') === -1 && input.indexOf('10.') === -1 && input.indexOf('/') === -1 && isNaN(parseInt(input.toLowerCase().replace('pmc',''))) && (input.length < 30 || input.replace(/\+/g,' ').split(' ').length < 3) ) ) {
        $('#oabutton_error').html('<p>Sorry, we can\'t use partial titles/citations. Please provide the full title or citation, or a suitable URL or identifier.</p>').show();
        _doing_availability = false;
        return;
      }
      if (!data.url) data.url = input;
      $('.oabutton_find').html('Searching .');
      if (!_intervaled) {
        _intervaled = true;
        setInterval(function() {
          try {
            var w = $('.oabutton_deposit').length ? $('.oabutton_deposit') : $('.oabutton_find');
            var srch = w.first().html();
            if (srch.indexOf('.') !== -1) {
              var dots = srch.split('.');
              if (dots.length >= 4) {
                srch = srch.replace(/\./g,'').trim() + ' .';
              } else {
                srch += ' .';
              }
              w.html(srch);
            }
          } catch(err) {}
        }, 800);
      }
      data.from = _oab_opts.uid;
      data.plugin = 'shareyourpaper';
      data.embedded = window.location.href;
      if (_oab_config.pilot) data.pilot = _oab_config.pilot;
      if (_oab_config.live) data.live = _oab_config.live;

      var avopts = {
        type:'POST',
        url:api+'/availability',
        cache: false,
        processData: false,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data),
        success: function(data) {
          _doing_availability = false;
          avail = data;
          $('#oabutton_input').val('');
          inform();
        },
        error: function() {
          _doing_availability = false;
          $('#oabutton_input').val('');
          $('#oabutton_error').show().html('<p>Oh dear, the service is down! We\'re aware, and working to fix the problem. ' + _lib_contact + '</p>');
        }
      };
      $.ajax(avopts);
    }
  }

  $(_oab_opts.element).on('keyup','#oabutton_input',availability);
  $(_oab_opts.element).on('click','.oabutton_find',availability);
  $(_oab_opts.element).on('click','.restart',_restart);
  $(_oab_opts.element).on('click','.oabutton_deposit',deposit);
  $(_oab_opts.element).on('keyup','#oabutton_email',function(e) { if (e.keyCode === 13) deposit() });
  $(_oab_opts.element).on('click','.oabutton_opendeposit',opendeposit);
  $(_oab_opts.element).on('click','#oabutton_getmore',function(e) { e.preventDefault(); getmore(); });

  // could get custom _ops from the user config
  if (_oab_config.autorun !== true) {
    var searchfor = undefined;
    if (_oab_config.autorunparams) {
      var cp = _oab_config.autorunparams.replace(/"/g,'').replace(/'/g,'').split(',');
      for ( var o in cp) {
        var eq = undefined;
        var op = cp[o].trim();
        if (op.indexOf('=') !== -1) {
          eq = op.split('=')[1];
          op = op.split('=')[0];
        }
        if (window.location.search.replace('?','&').indexOf('&'+op+'=') !== -1) _parameta[eq !== undefined ? eq : op] = decodeURIComponent(window.location.search.replace('?','&').split('&'+op+'=')[1].split('&')[0].replace(/\+/g,' '));
        if (searchfor === undefined) searchfor = _parameta[eq !== undefined ? eq : op];
      }
    } else {
      for ( var o in _ops) {
        var op = _ops[o];
        if (window.location.search.replace('?','&').indexOf('&'+op+'=') !== -1) _parameta[op] = decodeURIComponent(window.location.search.replace('?','&').split('&'+op+'=')[1].split('&')[0].replace(/\+/g,' '));
        if (searchfor === undefined) searchfor = _parameta[op];
      }
    }
    if (searchfor) {
      $('#oabutton_input').val(searchfor);
      $('.oabutton_find').trigger('click');
    }
  }
};

var shareyourpaper = function(opts) {
  _oab_opts = opts;
  if (window.jQuery === undefined) {
    var site = _oab_opts.site ? _oab_opts.site : 'https://openaccessbutton.org';
    if (window.location.host.indexOf('dev.openaccessbutton.org') !== -1 && !_oab_opts.site) site = 'https://dev.openaccessbutton.org';
    var headTag = document.getElementsByTagName("head")[0];
    var jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    jqTag.src = site + '/static/jquery-1.10.2.min.js';
    jqTag.onload = _config;
    headTag.appendChild(jqTag);
  } else {
     _config();
  }
}
