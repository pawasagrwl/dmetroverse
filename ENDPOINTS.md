# Available Endpoints

**_Please note that there is no official documentation available for the backend API of Delhi Metro Rail. Therefore, there are no specified rules or laws regarding its usage. The information provided in this README is for testing and informational purposes only. The usage of this API or the URLs mentioned herein may not be allowed or supported by Delhi Metro Rail or its authorities._**

**_By using their API or accessing the provided endpoints, you acknowledge that you are solely responsible for your actions. The owner of this repository and the information provided in this README are not liable for any consequences or damages that may arise from the usage of this site or the utilization of these endpoints._**

> Note: This isn't an exhaustive list, these endpoints are the ones that I have determined through network analysis. There may be more endpoints available. If you find any, please let me know by [creating an issue](https://github.com/dmetroverse-code/issues) or [submitting a pull request](https://github.com/dmetroverse-code/pulls)

Main URL: `https://backend.delhimetrorail.com/api/v2/[LANGUAGE]/(OPTION)`

LANGUAGE = `en`/`hi`
1. **Service Information**

   - URL: [`https://backend.delhimetrorail.com/api/v2/en/service_information`](https://backend.delhimetrorail.com/api/v2/en/service_information)
   - Description: This API endpoint provides current service information for the Delhi Metro Rail.

2. **Line List**

   - URL: [`https://backend.delhimetrorail.com/api/v2/en/line_list`](https://backend.delhimetrorail.com/api/v2/en/line_list)
   - Description: This API endpoint provides a list of all the metro lines available.

3. **Station List**

   - URL: [`https://backend.delhimetrorail.com/api/v2/en/station_list`](https://backend.delhimetrorail.com/api/v2/en/station_list)
   - Description: This API endpoint provides a list of all the metro stations available.

4. **Station Route (Least Distance)**

   - URL: `https://backend.delhimetrorail.com/api/v2/en/station_route/origin/destination/least-distance/date-time`
   - Usage: Replace `origin` and `destination` with the desired station codes. The `date-time` format should be specified.
   - Description: This API endpoint provides the shortest route between the specified origin and destination stations.
   - > Note: This endpoint is CORS enabled, thus cannot be accessed directly from the browser. You can use a proxy server to access this endpoint.

5. **Station Route (Minimum Interchange)**

   - URL: `https://backend.delhimetrorail.com/api/v2/en/station_route/origin/destination/minimum-interchange/date-time`
   - Usage: Replace `origin` and `destination` with the desired station codes. The `date-time` format should be specified.
   - Description: This API endpoint provides the route with the least number of interchanges between the specified origin and destination stations.
   - > Note: This endpoint is CORS enabled, thus cannot be accessed directly from the browser. You can use a proxy server to access this endpoint.

6. **Station by Line**

   - URL: `https://backend.delhimetrorail.com/api/v2/en/station_by_line/LN[number]`
   - Usage: Replace `[number]` with the desired line number (0-9). Example: LN1, LN2, ...
   - Description: This API endpoint provides a list of stations for the specified metro line.
   - Example: [`https://backend.delhimetrorail.com/api/v2/en/station_by_line/LN1`](https://backend.delhimetrorail.com/api/v2/en/station_by_line/LN1)

7. **Station Details**

   - URL: `https://backend.delhimetrorail.com/api/v2/en/station/[code]`
   - Usage: Replace `[code]` with the desired station code.
   - Description: This API endpoint provides details for the specified station.
   - Example: [`https://backend.delhimetrorail.com/api/v2/en/station/KG`](https://backend.delhimetrorail.com/api/v2/en/station/KG)

8. **Passenger Facilities**

   - URL: [`https://backend.delhimetrorail.com/api/v2/en/passenger/facilities`](https://backend.delhimetrorail.com/api/v2/en/passenger/facilities)
   - Description: This API endpoint provides information about the facilities available for passengers.

9. **Passenger Facilities for Women Passengers**

   - URL: [`https://backend.delhimetrorail.com/api/v2/en/passenger/facilities-for-women-passengers`](https://backend.delhimetrorail.com/api/v2/en/passenger/facilities-for-women-passengers)
   - Description: This API endpoint provides information about the facilities available specifically for women passengers.

10. **Passenger Facilities for Differently-Abled Passengers**

    - URL: [`https://backend.delhimetrorail.com/api/v2/en/passenger/facilities-for-differently-abled-passengers/`](https://backend.delhimetrorail.com/api/v2/en/passenger/facilities-for-differently-abled-passengers/)
    - Description: This API endpoint provides information about the facilities available for differently-abled passengers.

11. **Passenger Parking and Bicycle Facilities**
    - URL: [`https://backend.delhimetrorail.com/api/v2/en/passenger/parking-bicycle-facilities/`](https://backend.delhimetrorail.com/api/v2/en/passenger/parking-bicycle-facilities/)
    - Description: This API endpoint provides information about parking and bicycle facilities available for passengers.
