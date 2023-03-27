<?php

/**
 * Plugin Name:       Ghostwind Features
 * Plugin URI:        https://example.com/plugins/the-basics/
 * Description:       Ghostwind plugin for additional features.
 * Version:           1.1
 * Requires at least: 6.1
 * Requires PHP:      8.0
 * Author:            Galaxy Progs
 * Author URI:        https://author.example.com/
 * Text Domain:       gw-features
 * Domain Path:       /languages
*/

//Constants
// C:\xampp\htdocs\wp\wp-content\plugins\gw-features
define('GW_PLUGIN_PATH',plugin_dir_path(__FILE__));
// http://localhost:8080/wp/wp-content/plugins/gw-features/
define('GW_PLUGIN_URL',plugin_dir_url(__FILE__));

//Includes
include(GW_PLUGIN_PATH . '/includes/activation.php');
include(GW_PLUGIN_PATH . '/includes/custom-post-types/topic.php');

// plugin activation
register_activation_hook(__FILE__,'gw_plugin_activation');

// Action Hooks

add_action('init','gw_custom_post_type_topic');

