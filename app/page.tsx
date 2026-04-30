import EventCard from '@/components/EventCard'
import { ExploreButton } from '@/components/ExploreButton'
import { NEXT_PUBLIC_BASE_URL } from '@/config/env';

type EventListItem = {
  id: string;
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

const Page = async () => {
  const response  = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/events`);
  const { events = [] }: { events: EventListItem[] } = await response.json();

  return (
    <section>
      <h1 className='text-center mt-10'>The Hub for Every Day  <br/> Event You Can`t Miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups, and Conferences, All in One Place</p>
      <ExploreButton/>
      
      <div>
        <ul className="events">
          {events && events.length > 0 && events.map((e) => (
            <ol key={e.id || e.title}>
              <EventCard {...e}/>
            </ol>
          ))}
        </ul>  
      </div>  
    </section>
  )
}
export default Page
