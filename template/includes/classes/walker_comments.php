<?php

class Display_Comments extends Walker_Comment {
    public function start_lvl( &$output, $depth = 0, $args = array() ) { 
        $classes = ($depth >=0 ) ? 'comments-list reply-list' :'comments-list';
        $ids = ($depth >=0 ) ? '' :'comments-list';
        $output .="<ul id='".$ids."' class='".$classes."' depth_".$depth.">";
    }
    public function start_el( &$output, $comment, $depth = 0, $args = array(), $id = 0 ) {
        $url = get_permalink($comment->comment_post_ID);
        $output .= "<li id='".$comment->comment_ID."'>";

        if($depth > 0){
            $output .= '<div class="comment-avatar">';
            $output .= get_avatar($comment->user_id, 96,  '',  '', [
                        'alt' => 'Avatar of Author',
                        'extra_attr' => "data-tippy-content=$comment->comment_author"
                    ]);
            $output .= '</div>';
            $output .= '<div class="comment-box">';
            $output .= '<div class="comment-head">';
            $output .= ' <h6 class="comment-name"><a href="">'.$comment->comment_author.'</a><span class="by-author">'.get_userdata($comment->user_id)->roles[0].'</span></h6>';
            $output .= '<span>';
            $output .= sprintf( 
                        '%s ago',
                        human_time_diff( 
                            get_comment_date( 'U', $comment->comment_ID ), 
                            current_time( 'timestamp' ) 
                        ) 
                    );
            $output .= '</span>';
            $output .= '<a href="'.$url.'?replytocom='.$comment->comment_ID.'#respond"><i class="fa fa-reply"></i></a>';
            $output .= '<i class="fa fa-heart"></i>';
            $output .= '</div>';
            $output .= '<div class="comment-content">';
            $output .= (get_comment_author($comment->comment_parent) != $comment->comment_author) ? '<p class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">To: '.get_comment_author($comment->comment_parent).'</p>' : '';
            $output .= '<p>' . $comment->comment_content . '</p>';
            $output .= '</div>';
            $output .= '</div>';
        }else{
            $output .= '<div class="comment-main-level">';
            $output .= '<div class="comment-avatar">';
            $output .= get_avatar($comment->user_id, 96,  '',  '', [
                'alt' => 'Avatar of Author',
                'extra_attr' => "data-tippy-content=$comment->comment_author"
            ]);
            $output .= '</div>';
            $output .= '<div class="comment-box">';
            $output .= '<div class="comment-head">';
            $output .= ' <h6 class="comment-name"><a href="">'.$comment->comment_author.'</a><span class="by-author">'.get_userdata($comment->user_id)->roles[0].'</span></h6>';
            $output .= '<span>';
            $output .= sprintf( 
                        '%s ago',
                        human_time_diff( 
                            get_comment_date( 'U', $comment->comment_ID ), 
                            current_time( 'timestamp' ) 
                        ) 
                    );
            $output .= '</span>';
            $output .= '<a href="'.$url.'?replytocom='.$comment->comment_ID.'#respond"><i class="fa fa-reply"></i></a>';
            $output .= '<i class="fa fa-heart"></i>';
            $output .= '</div>';
            $output .= '<div class="comment-content">';
            $output .= $comment->comment_content;
            $output .= '</div>';
            $output .= '</div>';
            $output .= '</div>';
        }
    }

    public function end_lvl( &$output, $depth = 0, $args = array() ) { 
        $output .= '</ul>';
    }

    public function end_el( &$output, $comment, $depth = 0, $args = array(), $id = 0 ) {
        $output .= '</li>';
    }
}