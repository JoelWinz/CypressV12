<?php

$GLOBALS['TYPO3_CONF_VARS'] = array_replace_recursive(
    $GLOBALS['TYPO3_CONF_VARS'],
    [
        'BE' => [
            'debug' => getenv('TYPO3_BE_DEBUG'),
        ],
        'DB' => [
            'Connections' => [
                'Default' => [
                    'dbname' => getenv('TYPO3_DB_CONNECTIONS_DEFAULT_NAME'),
                    'host' => getenv('TYPO3_DB_CONNECTIONS_DEFAULT_HOST'),
                    'password' => getenv('TYPO3_DB_CONNECTIONS_DEFAULT_PASS'),
                    'port' => getenv('TYPO3_DB_CONNECTIONS_DEFAULT_PORT'),
                    'user' => getenv('TYPO3_DB_CONNECTIONS_DEFAULT_USER'),
                ],
                'NavAdb' => [
                    'dbname' => getenv('TYPO3_DB_CONNECTIONS_NAVADB_NAME'),
                    'host' => getenv('TYPO3_DB_CONNECTIONS_NAVADB_HOST'),
                    'password' => getenv('TYPO3_DB_CONNECTIONS_NAVADB_PASS'),
                    'port' => getenv('TYPO3_DB_CONNECTIONS_NAVADB_PORT'),
                    'user' => getenv('TYPO3_DB_CONNECTIONS_NAVADB_USER'),
                    'charset' => getenv('TYPO3_DB_CONNECTIONS_NAVADB_CHARSET'),
                    'driver' => getenv('TYPO3_DB_CONNECTIONS_NAVADB_DRIVER'),
                ],
                'Rpro' => [
                    'dbname' => getenv('TYPO3_DB_CONNECTIONS_RPRO_NAME'),
                    'host' => getenv('TYPO3_DB_CONNECTIONS_RPRO_HOST'),
                    'password' => getenv('TYPO3_DB_CONNECTIONS_RPRO_PASS'),
                    'port' => getenv('TYPO3_DB_CONNECTIONS_RPRO_PORT'),
                    'user' => getenv('TYPO3_DB_CONNECTIONS_RPRO_USER'),
                ],
            ],
        ],
        'EXTENSIONS' => [
            'nnrestapi' => [
                'apiKeys' => getenv('EXTENSIONS_RESTAPI_API_KEYS'),
            ],
            'sysfile_faker' => [
                'enable' => getenv('EXTENSIONS_SYSFILEFAKER_ENABLE'),
                'remoteHost' => getenv('EXTENSIONS_SYSFILEFAKER_REMOTEHOST'),
            ],
            'vdi' => [
                'googleApiKey' => getenv('EXTENSIONS_VDI_GOOGLE_APIKEY') ?: getenv('EXTENSIONS_VDI_GOOGLEAPIKEY'),
            ],
            'vdi_apiserver_client' => [
                'vdi_api_url' => getenv('EXTENSIONS_VDIAPISERVER_URL'),
                'vdi_api_user' => getenv('EXTENSIONS_VDIAPISERVER_USER'),
                'vdi_api_password' => getenv('EXTENSIONS_VDIAPISERVER_PASSWORD'),
            ],
            'vdi_events' => [
                'wfSolrUrl' => getenv('EXTENSIONS_VDIEVENTS_WFSOLRURL'),
                'edudipApiToken' => getenv('EXTENSIONS_VDIEVENTS_EDUDIPAPITOKEN'),
            ],
            'vdi_mediathek' => [
                'ffmpegBinPath' => getenv('EXTENSIONS_VDIMEDIATHEK_FFMPEGBINPATH'),
                'ffprobeBinPath' => getenv('EXTENSIONS_VDIMEDIATHEK_FFPROBEBINPATH'),
            ],
            'vdi_optivo' => [
                'optivoApiToken' => getenv('EXTENSIONS_VDIOPTIVO_APIKEY'),
            ],
            'vdi_publications' => [
                'leadExportPath' => getenv('EXTENSIONS_VDIPUBLICATIONS_LEAD_EXPORT_PATH'),
                'leadArchivePath' => getenv('EXTENSIONS_VDIPUBLICATIONS_LEAD_ARCHIVE_PATH'),
                'leadUploadPath' => getenv('EXTENSIONS_VDIPUBLICATIONS_LEAD_UPLOAD_PATH'),
                'vdiFtpHost' => getenv('EXTENSIONS_VDIPUBLICATIONS_VDI_FTP_HOST'),
                'vdiFtpPort' => getenv('EXTENSIONS_VDIPUBLICATIONS_VDI_FTP_PORT'),
                'vdiFtpUser' => getenv('EXTENSIONS_VDIPUBLICATIONS_VDI_FTP_USER'),
                'vdiFtpPassword' => getenv('EXTENSIONS_VDIPUBLICATIONS_VDI_FTP_PASSWORD'),
            ],
            'vdi_rest_api' => [
                'ipRestrictions' => getenv('EXTENSIONS_RESTAPI_IP_RESTRICTIONS'),
            ],
            'vdi_soap_cp' => [
                'allowedIps' => getenv('EXTENSIONS_VDISOAPCP_ALLOWED_IPS'),
            ],
            'vdi_verlag_sso' => [
                'apiUrl' => getenv('EXTENSIONS_VDIVERLAGSSO_APIURL'),
                'basicAuthUsername' => getenv('EXTENSIONS_VDIVERLAGSSO_BASICAUTHUSERNAME'),
                'basicAuthPassword' => getenv('EXTENSIONS_VDIVERLAGSSO_BASICAUTHPASSWORD'),
                'loginUrl' => getenv('EXTENSIONS_VDIVERLAGSSO_LOGINURL'),
                'newsPlusUrl' => getenv('EXTENSIONS_VDIVERLAGSSO_NEWSPLUSURL'),
                'profileUrl' => getenv('EXTENSIONS_VDIVERLAGSSO_PROFILEURL'),
                'defaultPassword' => getenv('EXTENSIONS_VDIVERLAGSSO_DEFAULTPASSWORD'),
                'accessTokenClientSecret' => getenv('EXTENSIONS_VDIVERLAGSSO_ACCESSTOKENCLIENTSECRET'),
            ],
        ],
        'FE' => [
            'debug' => getenv('TYPO3_FE_DEBUG'),
        ],
        'GFX' => [
            'processor' => getenv('TYPO3_GFX_PROCESSOR'),
            'processor_path' => getenv('TYPO3_GFX_PROCESSOR_PATH'),
            'processor_path_lzw' => getenv('TYPO3_GFX_PROCESSOR_PATH_LZW'),
        ],
        'MAIL' => [
            'transport' => getenv('TYPO3_MAIL_TRANSPORT'),
            'transport_sendmail_command' => getenv('TYPO3_MAIL_TRANSPORT_SENDMAIL_COMMAND'),
            'transport_smtp_server' => getenv('TYPO3_MAIL_TRANSPORT_SMTP_SERVER'),
            'layoutRootPaths' => [
                100 => 'EXT:vdi/Resources/Private/Layouts/Email/'
            ],
        ],
        'SYS' => [
            'createGroup' => getenv('TYPO3_SYS_CREATEGROUP'),
            'devIPmask' => getenv('TYPO3_SYS_DEV_IPMASK'),
            'displayErrors' => getenv('TYPO3_SYS_DISPLAY_ERRORS'),
            'encryptionKey' => getenv('TYPO3_SYS_ENCRYPTIONKEY'),
            'exceptionalErrors' => getenv('TYPO3_SYS_EXCEPTIONAL_ERRORS'),
            'fileCreateMask' => getenv('TYPO3_SYS_FILECREATEMASK'),
            'folderCreateMask' => getenv('TYPO3_SYS_FOLDERCREATEMASK'),
            'reverseProxyHeaderMultiValue' => getenv('TYPO3_SYS_REVERSEPROXYHEADERMULTIVALUE'),
            'reverseProxyIP' => getenv('TYPO3_SYS_REVERSEPROXYIP'),
            'reverseProxySSL' => getenv('TYPO3_SYS_REVERSEPROXYSSL'),
            'systemMaintainers' => array_filter(explode(',', getenv('TYPO3_SYS_SYSTEM_MAINTAINERS'))),
            'trustedHostsPattern' => getenv('TYPO3_SYS_TRUSTED_HOSTS_PATTERN'),
        ],
    ]
);
