<!DOCTYPE html>
<html lang="<?php bloginfo('language')?>">
<head>
<?php wp_head(); ?>	
</head>
<body class="bg-gray-200 font-sans leading-normal tracking-normal">

	<!--Header-->
	<div class="w-full m-0 p-0 bg-cover bg-bottom" style="background-image:url('<?php echo get_theme_file_uri('assets/img/cover.jpg')?>'); height: 60vh; max-height:460px;">
			<div class="container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal">
				<!--Title-->
					<p class="text-white font-extrabold text-3xl md:text-5xl">
						👻 <?php bloginfo('name')?>
					</p>
					<p class="text-xl md:text-2xl text-gray-500"><?php bloginfo('description')?></p>
			</div>
		</div>
		