<?php

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

$keys = array(
    'werkcv_tools_default_theme',
    'werkcv_tools_enable_cta',
    'werkcv_tools_enable_footer_credit',
    'werkcv_tools_open_links_new_tab',
);

foreach ($keys as $key) {
    delete_option($key);
}
