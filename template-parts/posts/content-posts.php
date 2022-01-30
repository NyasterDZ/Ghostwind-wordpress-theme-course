<!--1/3 col -->
<div class="w-full md:w-1/3 p-6 flex flex-col flex-shrink">
    <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
        <a href="#" class="flex flex-wrap no-underline hover:no-underline">
            <!-- <img src="" class="h-64 w-full rounded-t pb-6"> -->
            <?php
                the_post_thumbnail('post-thumbnail', [
                    'class' => 'h-64 w-full rounded-t pb-3'
                ]);
            
            $categories = get_the_category();
            foreach($categories as $category){ ?>
                <p class="ml-1 mr-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">
                    <?php echo $category->name ?>
                </p>
            <?php } ?>
            
            <div class="w-full font-bold text-xl text-gray-900 px-6"><a href="<?php echo get_permalink()?>"><?php the_title()?></a></div>
            <p class="text-gray-800 font-serif text-base px-6 mb-5">
            <?php echo get_the_excerpt() ?>
            </p>
        </a>
    </div>
    <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
        <div class="flex items-center justify-between">
            <?php 
            $author = get_the_author();
            echo get_avatar(get_the_author_meta( 'ID' ), 96,  '',  '', [
                'class' => 'w-8 h-8 rounded-full mr-4 avatar',
                'alt' => 'Avatar of Author',
                'extra_attr' => "data-tippy-content=$author"
            ]); ?>
            <p class="text-gray-600 text-xs md:text-sm"><?php echo get_the_date()?></p>
        </div>
    </div>
</div>