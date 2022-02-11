	
	<!--Title-->
	<div class="text-center pt-16 md:pt-32">
		<p class="text-sm md:text-base text-green-500 font-bold"><?php the_date()?> <span class="text-gray-900">/</span> <?php echo get_the_author() ?></p>
		<h1 class="font-bold break-normal text-3xl md:text-5xl"><?php echo get_the_title(); ?></h1>
	</div>

	<!--image-->
	<div class="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded" style="background-image:url('<?php echo (has_post_thumbnail()) ? get_the_post_thumbnail_url() : get_theme_file_uri("assets/img/default_image.png") ?>'); height: 75vh;"></div>
	
	<!--Container-->
	<div class="container max-w-5xl mx-auto -mt-32">
		
		<div class="mx-0 sm:mx-6">
			
			<div class="mb-5 bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal" style="font-family:Georgia,serif;">
				
                <?php the_content() ?>
						
			</div>

           	<!--Author-->
				<div class="flex w-full items-center font-sans p-12 md:p-12">
					<?php 
						$author = get_the_author();
						echo get_avatar(get_the_author_meta( 'ID' ), 96,  '',  '', [
							'class' => 'w-10 h-10 rounded-full mr-4',
							'alt' => 'Avatar of Author',
							'extra_attr' => "data-tippy-content=$author"
						]); ?>
					<div class="flex-1">
						<p class="text-base font-bold text-base md:text-xl leading-none"><?php echo get_the_author() ?></p>
						<p class="text-gray-600 text-xs md:text-base"><?php echo get_the_author_meta( 'description' )?></p>
					</div>
					<div class="justify-end">
						<button class="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">Follow</button>
					</div>
				</div>
				<!--/Author-->

			<?php
			if ( comments_open() || get_comments_number() ) {
				comments_template();
			}
			?>	
		</div>
	</div>
	
	<div class="bg-gray-200">
	
		<div class="container w-full max-w-6xl mx-auto px-2 py-8">
			<div class="flex flex-wrap -mx-2">
				<?php
				$related_posts = new WP_Query([
					'post_type' => 'post',
					'posts_per_page' => 3,
					'post__not_in' => [$post->ID],
					'category__in' => wp_get_post_categories($post->ID),
					'orderby'        => 'rand',
				]);

				while($related_posts->have_posts()){
					$related_posts->the_post();
				?>
				<div class="w-full md:w-1/3 px-2 pb-12">
					<div class="h-full bg-white rounded overflow-hidden shadow-md hover:shadow-lg relative smooth">
						<a href="<?php the_permalink()?>" class="no-underline hover:no-underline">
								<?php
								if (has_post_thumbnail()){
									the_post_thumbnail('post-thumbnail', [
										'class' => 'h-64 w-full rounded-t pb-3'
									]);
								}else { ?>
									<img src="<?php echo get_theme_file_uri("assets/img/default_image.png")?>" class="h-64 w-full rounded-t pb-3" alt="">
								<?php } ?>
								<div class="p-2 h-auto md:h-48">
									<?php
										$cat = get_the_category();
										foreach($cat as $category){ 
									?>
										
									<p class="ml-1 mr-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">
										<?php echo $category->name ?>
									</p>
									<?php } ?>
									<div class="font-bold text-xl text-gray-900"><?php echo get_the_title();?></div>
									<p class="text-gray-800 font-serif text-base mb-5">
										<?php echo get_the_excerpt(); ?> 
									</p>
								</div>
								<div class="flex items-center justify-between inset-x-0 bottom-0 p-6">
									<?php 
									$author = get_the_author();
									echo get_avatar(get_the_author_meta( 'ID' ), 96,  '',  '', [
										'class' => 'w-8 h-8 rounded-full mr-4',
										'alt' => 'Avatar of Author',
										'extra_attr' => "data-tippy-content=$author"
									]); ?>
									<p class="text-gray-600 text-xs md:text-sm"><?php echo get_the_date()?></p>
								</div>
						</a>
					</div>
				</div>
				<?php
					}
					wp_reset_postdata();
				?>
			</div>
		</div>


	</div>
