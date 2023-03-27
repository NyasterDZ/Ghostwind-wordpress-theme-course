<?php

function gw_custom_post_type_topic(){
    $labels = array(
		'name'                  => _x( 'Topics', 'Post type general name', 'gw-features' ),
		'singular_name'         => _x( 'Topic', 'Post type singular name', 'gw-features' ),
		'menu_name'             => _x( 'Topics', 'Admin Menu text', 'gw-features' ),
		'name_admin_bar'        => _x( 'Topic', 'Add New on Toolbar', 'gw-features' ),
		'add_new'               => __( 'Add New', 'gw-features' ),
		'add_new_item'          => __( 'Add New Topic', 'gw-features' ),
		'new_item'              => __( 'New Topic', 'gw-features' ),
		'edit_item'             => __( 'Edit Topic', 'gw-features' ),
		'view_item'             => __( 'View Topic', 'gw-features' ),
		'all_items'             => __( 'All Topics', 'gw-features' ),
		'search_items'          => __( 'Search Topics', 'gw-features' ),
		'parent_item_colon'     => __( 'Parent Topics:', 'gw-features' ),
		'not_found'             => __( 'No Topics found.', 'gw-features' ),
		'not_found_in_trash'    => __( 'No Topics found in Trash.', 'gw-features' ),
		'featured_image'        => _x( 'Topic Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'gw-features' ),
		'set_featured_image'    => _x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'gw-features' ),
		'remove_featured_image' => _x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'gw-features' ),
		'use_featured_image'    => _x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'gw-features' ),
		'archives'              => _x( 'Topic archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'gw-features' ),
		'insert_into_item'      => _x( 'Insert into Topic', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'gw-features' ),
		'uploaded_to_this_item' => _x( 'Uploaded to this Topic', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'gw-features' ),
		'filter_items_list'     => _x( 'Filter Topics list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'gw-features' ),
		'items_list_navigation' => _x( 'Topics list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'gw-features' ),
		'items_list'            => _x( 'Topics list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'gw-features' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'topic' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
        'show_in_rest'       => true
	);

	register_post_type( 'topic', $args );
}