import { Carousel, Blockquote, Rating, RatingStar, Avatar, Card } from 'flowbite-react';

// Flowbite Carousel Component
const HomeCarousel = () => {
  return (
    <div className="mt-8 h-80 sm:h-96 xl:h-112 2xl:h-128">
      <Carousel pauseOnHover>
        <img src="https://images.unsplash.com/photo-1526328828355-69b01701ca6a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 1" />
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 2" />
        <img src="https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3" />
        <img src="https://images.unsplash.com/photo-1696069475994-7671dc6dc6c0?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 4" />
        <img src="https://images.unsplash.com/photo-1600250395178-40fe752e5189?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 5" />
      </Carousel>
    </div>
  );
};

// Detailed Blockquote Component with Rating and Avatar
const DetailedBlockquote = () => {
  return (
    <figure className="max-w-screen-md mx-auto my-8">
      <div className="mb-4 flex justify-center">
        <Rating size="md">
          <RatingStar />
          <RatingStar />
          <RatingStar />
          <RatingStar />
          <RatingStar />
        </Rating>
      </div>
      <Blockquote>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          "Argyou is a groundbreaking platform where the art of debate is truly appreciated and encouraged. With a wide range of topics and a vibrant community, it’s the perfect space for those who want to challenge their thinking and expand their perspectives"
        </p>
      </Blockquote>
      <figcaption className="mt-6 flex justify-center items-center space-x-3">
        <Avatar rounded size="xs" img="https://pyxis.nymag.com/v1/imgs/fbc/a12/0f0a9443d63acf6b84e148f7125b4253d5-30-ryan-gosling-study.rsquare.w400.jpg" alt="Jordan Casey" />
        <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
          <cite className="pr-3 font-medium text-gray-900 dark:text-white">Jordan Casey</cite>
          <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">Debate Enthusiast at Argyou</cite>
        </div>
      </figcaption>
    </figure>
  );
};

// Cards Grid with individually named and described cards
const CardsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 py-8">
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Real-Time Debates</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">Engage in live debates with participants from around the globe. Experience real-time communication and instant feedback on your arguments.</p>
      </Card>
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Expert Moderation</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400"> Benefit from expert moderation in all discussions to ensure a respectful and constructive debate environment.</p>
      </Card>
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Diverse Topics Library</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">Access a vast library of topics ranging from politics and philosophy to science and technology, curated to cater to all interests and expertise levels.</p>
      </Card>
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Secure & Anonymous Debating</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">Participate in debates anonymously with options to conceal your identity, ensuring privacy and reducing bias in discussions.</p>
      </Card>
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Analytics and Insights</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">Gain insights into your debating style and effectiveness through analytics that track your argumentation patterns, win rate, and audience impact.</p>
      </Card>
    </div>
  );
};

// HomeComponent including Carousel, Blockquote, and Cards
export const HomeComponent = () => {
  return (
    <div className="container mx-auto px-4">
      <HomeCarousel />
      <DetailedBlockquote />
      <CardsGrid />
    </div>
  );
};
