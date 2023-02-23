# Redux Dashboard

The Dashboard application leverages React, TypeScript, and Redux to present data in a visually appealing manner. It obtains data in CSV format through the Google Spreadsheet API, allowing for dynamic representation and manipulation within the Dashboard View. 

The View features a month toggle and displays the sum of the top 5 Order Volumes for the selected month, along with a table showcasing these volumes and a progress bar indicating whether the monthly goal of 100,000€ has yet been met. The application periodically refreshes the data every 60 seconds to ensure that the most up-to-date data is displayed.
