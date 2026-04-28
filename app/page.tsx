import EventCard from '@/components/EventCard'
import { ExploreButton } from '@/components/ExploreButton'
const page = () => {
  return (
    <section>
      <h1 className='text-center mt-10'>The Hub for Every Day  <br/> Event You Can`t Miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups, and Conferences, All in One Place</p>
      <ExploreButton/>
      
      <div>
        <ul className="events">
          {/* {events.map((event) => (
            <div key={event.title}>
              <EventCard {...event}/>
            </div>
          ))} */}
        </ul>  
      </div>  
    </section>
  )
}
export default page