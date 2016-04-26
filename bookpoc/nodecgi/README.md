# Running node with apache

These are examples of node running within apache.  We have examples of two ways to manage this
* As a node script included in the page.
* Using a node-cgi library

# Node Script Setup (.cgi files)

* Go into httpd.conf and add/uncomment the following:
```
LoadModule cgi_module libexec/apache2/mod_cgi.so
LoadModule alias_module libexec/apache2/mod_alias.so
AddHandler cgi-script .cgi
```

* Either in a vhosts file or httpd.conf, add the following for your root path:
```
<Directory "FULL_PATH_TO_WEBROOT">
    Options +ExecCGI
</Directory>
```

* Restart apache

* Inside your cgi files, add the following
```
#!/usr/local/bin/node  (or wherever your path to node is)
```

# cgi-node Library Setup (.jss files)

* Create a `.htaccess` file in the web root directory and add the following:
```
Action "cgi-node" "/cgi-bin/cgi-node.min.js"
AddHandler "cgi-node" ".jss"
```
* Download  https://github.com/UeiRicho/cgi-node/releases/download/v0.2/cgi-node.min.js

* Open the file and change the first line to the path to node:  `#!/usr/local/bin/node`
  Also, change the session path to `\tmp\` or something.

* Go into httpd.conf and look for:
```
ScriptAliasMatch ^/cgi-bin ....
```
At the end of that line there is a path to the cgi-bin.  You need to place the downloaded file in that directory.

*  In httpd.conf, make sure the following are uncommented:
```
LoadModule cgi_module libexec/apache2/mod_cgi.so
LoadModule alias_module libexec/apache2/mod_alias.so
ScriptAliasMatch ^/cgi-bin/((?!(?i:webobjects)).*$) "/Library/WebServer/CGI-Executables/$1”
<Directory "/Library/WebServer/CGI-Executables">
    AllowOverride None
    Options None
    Require all granted
</Directory>
```
* Restart apache