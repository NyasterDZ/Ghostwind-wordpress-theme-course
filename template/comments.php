
<!-- Display Comments -->
<!-- <div class="comments-container">
    <h1>Comments</h1>

    <ul id="comments-list" class="comments-list">
        <li>
            <div class="comment-main-level">
                
                <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt=""></div>
                
                <div class="comment-box">
                    <div class="comment-head">
                        <h6 class="comment-name by-author"><a href="http://creaticode.com/blog">Agustin Ortiz</a></h6>
                        <span>hace 20 minutos</span>
                        <i class="fa fa-reply"></i>
                        <i class="fa fa-heart"></i>
                    </div>
                    <div class="comment-content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                    </div>
                </div>
            </div>
            
            <ul class="comments-list reply-list">
                <li>
                    
                    <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt=""></div>
                    
                    <div class="comment-box">
                        <div class="comment-head">
                            <h6 class="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
                            <span>hace 10 minutos</span>
                            <i class="fa fa-reply"></i>
                            <i class="fa fa-heart"></i>
                        </div>
                        <div class="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                        </div>
                    </div>
                </li>

                <li>
                    
                    <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt=""></div>
                   
                    <div class="comment-box">
                        <div class="comment-head">
                            <h6 class="comment-name by-author"><a href="http://creaticode.com/blog">Agustin Ortiz</a></h6>
                            <span>hace 10 minutos</span>
                            <i class="fa fa-reply"></i>
                            <i class="fa fa-heart"></i>
                        </div>
                        <div class="comment-content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                        </div>
                    </div>
                </li>
            </ul>
        </li>

        <li>
            <div class="comment-main-level">
                
                <div class="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_2_zps7de12f8b.jpg" alt=""></div>
                
                <div class="comment-box">
                    <div class="comment-head">
                        <h6 class="comment-name"><a href="http://creaticode.com/blog">Lorena Rojero</a></h6>
                        <span>hace 10 minutos</span>
                        <i class="fa fa-reply"></i>
                        <i class="fa fa-heart"></i>
                    </div>
                    <div class="comment-content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div> -->
<!-- End display comments-->

<div class="comments-container">
<h1>Comments(<?php comments_number()?>)</h1>

<ul id="comments-list" class="comments-list">
<?php
//http://localhost/wp/2022/01/12/post-4/?replytocom=10#respond
wp_list_comments([
    'walker' => new Display_Comments()
]);
?>
</ul>
<!-- Comment pagination -->
    <div class="text-center">
        <?php 
            echo paginate_comments_links(); 
        ?>
    </div>
</div>
<?php
comment_form([
    'comment_field' => '
        <div class="mt-3 p-3 w-full">
            <textarea rows="3" class="border p-2 rounded w-full" name="comment" placeholder="Write something..."></textarea>
        </div>
    ',
    'fields' => [
        'email' => '
            <div class="flex flex-wrap mx-3">
                <div class="w-full">
                    <label class="block mb-1" for="formGridCode_card">Email</label>
                    <input class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="email" name="email" id="email"/>
                </div>
            </div>
        ',
        'author' => '
            <div class="flex space-between mx-3 mb-2">
                <div class="w-full">
                    <label class="block mb-1" for="formGridCode_name">Author</label>
                    <input class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" name="author" id="author"/>
                </div>
        ',
        'url' => '
                <div class="w-full ml-1">
                    <label class="block mb-1" for="formGridCode_last">Website</label>
                    <input class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="url" name="url" id="url"/>
                </div>
            </div>
        ',
        
    ],
    'class_submit' => 'px-4 py-1 bg-gray-800 text-white rounded font-light hover:bg-gray-700',
    'submit_button' => '
        <div class="flex mx-3 mt-2">
            <input class="px-4 py-1 bg-gray-800 text-white rounded font-light hover:bg-gray-700" name="%1$s" type="submit" id="%2$s" value="%4$s" />.
        </div>
    ',
    'class_container' => 'mb-5 w-full bg-white p-2 pt-4 rounded shadow-lg',
    'logged_in_as' => '
        <p class="mx-3 text-blue-600">' . 
            sprintf( 'Logged in as <a class="text-red-600" href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out?</a>', admin_url( 'profile.php' ), 
            $user_identity, wp_logout_url() ) . '
        </p>
    ',
    'title_reply' => '<p class="mx-3">Leave a Reply</p>',
    'comment_notes_before' => '<p class="mx-3">Your email address will not be published</p>',
    'title_reply_to' => '<span class="mx-3">Leave a Reply to %s</span>',
    'cancel_reply_link' => '<i style="color:red;font-size:16px" class="far fa-window-close"></i>'
]);