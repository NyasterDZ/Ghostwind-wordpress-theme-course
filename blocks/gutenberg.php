<?php

function gw_gutenberg_blocks(){

     // Block Test
     wp_register_script('gw-block-test', get_theme_file_uri() . '/blocks/block-test/build/index.js', ['wp-blocks','wp-editor']);

     register_block_type('gw/block-test', [
          'editor_script' => 'gw-block-test'
     ]);

     // ATM Block
     wp_register_script('gw-block-atm', get_theme_file_uri() . '/blocks/atm/build/index.js', []);
     wp_register_style('gw-block-atm-style', get_theme_file_uri() . '/blocks/atm/build/index.css', []);

     register_block_type('gw/block-atm', [
          'editor_script' => 'gw-block-atm',
          'editor_style'  => 'gw-block-atm-style'
     ]);

     // ATM-BLOCK

     wp_register_script('gw-atm-block-script', get_theme_file_uri() . '/blocks/atm-block/build/index.js', []);
     wp_register_style('gw-atm-block-style', get_theme_file_uri() . '/blocks/atm-block/build/index.css', []);

     register_block_type('gw/atm-block', [
          'editor_script' => 'gw-atm-block-script',
          'editor_style'  => 'gw-atm-block-style'
     ]);

}