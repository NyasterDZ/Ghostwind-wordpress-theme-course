<?php

function gw_plugin_activation(){
    if(version_compare(get_bloginfo('version'),'5.9','<')){
        wp_die("Error");
    }
    gw_custom_post_type_topic();
    flush_rewrite_rules();
}