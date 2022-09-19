# Nbyula-Appointment-Booking
This Repository Is For A Project Given By Nbyula - Appointment Booking

User Can Register Themselves With Their Slot Timings And Can Book An Appointment With Other Users On The Same Day. 
Some Edge Cases Which Are Taken Care Of Are : 
1. If The Host Or The Guest Is Try To Book An Appointment Which Is Out Of Their Slot Then Error Pops Up.
2. If Host Or The Guest Is Try To Book An Appointment At A Time When Their Is Another Appointment Of The Host Or The Guest, Then Error Pops Up.
3. If The Users Try To Book An Appointment Before The Current Time Then Error Pops Up. User Can Book An Appointment Only For The Same Day.

Both Frontend And The Backend Is Deployed On Vercel

## Frontend Link - 

1. [nbyula-appointment-booking-frontend.vercel.app](nbyula-appointment-booking-frontend.vercel.app)
2. [nbyula-appointment-booking-frontend-harshuhacker.vercel.app](nbyula-appointment-booking-frontend-harshuhacker.vercel.app)
3. [nbyula-appointment-booking-frontend-git-master-harshuhacker.vercel.app](nbyula-appointment-booking-frontend-git-master-harshuhacker.vercel.app)


## Backend API Link - 

1. [nbyula-appointment-booking.vercel.app](nbyula-appointment-booking.vercel.app)
2. [nbyula-appointment-booking-harshuhacker.vercel.app](nbyula-appointment-booking-harshuhacker.vercel.app)
3. [nbyula-appointment-booking-git-master-harshuhacker.vercel.app](nbyula-appointment-booking-git-master-harshuhacker.vercel.app)

## API EndPoints - 

1. For Registering User 1 - POST - 
[https://nbyula-appointment-booking.vercel.app/users/register?email=sahil@gmail.com&password=55&name=Sahil%20Singh&startTime=11:00&endTime=15:00](https://nbyula-appointment-booking.vercel.app/users/register?email=sahil@gmail.com&password=55&name=Sahil%20Singh&startTime=11:00&endTime=15:00)


2. For Registering User 2 - POST - 
[https://nbyula-appointment-booking.vercel.app/users/register?email=harshisindian@gmail.com&password=25&name=Harsh%20Prasad&startTime=10:00&endTime=17:00](https://nbyula-appointment-booking.vercel.app/users/register?email=harshisindian@gmail.com&password=25&name=Harsh%20Prasad&startTime=10:00&endTime=17:00)


3. For Registering User 3 - POST - 
[https://nbyula-appointment-booking.vercel.app/users/register?email=ayushisindian@gmail.com&password=12&name=Ayush%20Prasad&startTime=09:00&endTime=16:00](https://nbyula-appointment-booking.vercel.app/users/register?email=ayushisindian@gmail.com&password=12&name=Ayush%20Prasad&startTime=09:00&endTime=16:00)


5. For LoggingIn User 1 - POST - 
[https://nbyula-appointment-booking.vercel.app/users/login?email=sahil@gmail.com&password=55](https://nbyula-appointment-booking.vercel.app/users/login?email=sahil@gmail.com&password=55)

8. For Updating Profile Of User 1 - POST - 
[https://nbyula-appointment-booking.vercel.app/users/update-profile?email=sahil@gmail.com&password=123&startTime=10:00&endTime=16:00&name=Sahil%20Singh](https://nbyula-appointment-booking.vercel.app/users/update-profile?email=sahil@gmail.com&password=123&startTime=10:00&endTime=16:00&name=Sahil%20Singh)


10. For Fetching All Users - GET - 
[https://nbyula-appointment-booking.vercel.app/users/all-user](https://nbyula-appointment-booking.vercel.app/users/all-user)


12. For Fetching Details Of User 2 - GET - 
[https://nbyula-appointment-booking.vercel.app/users/one-user?email=harshisindian@gmail.com](https://nbyula-appointment-booking.vercel.app/users/one-user?email=harshisindian@gmail.com)

14. For Creating An Appointment Between User 1 And User 2 - POST - 
[https://nbyula-appointment-booking.vercel.app/appointments/create-appointment?title=Appointment%201&agenda=Testing%201&time=13:00&host=sahil@gmail.com&guest=harshisindian@gmail.com](https://nbyula-appointment-booking.vercel.app/appointments/create-appointment?title=Appointment%201&agenda=Testing%201&time=13:00&host=sahil@gmail.com&guest=harshisindian@gmail.com)


16. For Creating An Appointment Between User 2 And User 3 - POST - 
[https://nbyula-appointment-booking.vercel.app/appointments/create-appointment?title=Appointment%202&agenda=Testing%202&time=12:00&host=harshisindian@gmail.com&guest=ayushisindian@gmail.com](https://nbyula-appointment-booking.vercel.app/appointments/create-appointment?title=Appointment%202&agenda=Testing%202&time=12:00&host=harshisindian@gmail.com&guest=ayushisindian@gmail.com)


18. For Fetching All The Appointments Of User 2 - GET - 
[https://nbyula-appointment-booking.vercel.app/appointments/get-user-appointment?email=harshisindian@gmail.com](https://nbyula-appointment-booking.vercel.app/appointments/get-user-appointment?email=harshisindian@gmail.com)


20. For Fetching All The Upcoming Appointments Of User 3 - GET - 
[https://nbyula-appointment-booking.vercel.app/appointments/get-upcoming-appointment?email=ayushisindian@gmail.com](https://nbyula-appointment-booking.vercel.app/appointments/get-upcoming-appointment?email=ayushisindian@gmail.com)

