from celery import shared_task
import requests
from bs4 import BeautifulSoup

@shared_task
def run_my_task():
    # This is the task that will run at 5 am every day
    print('Running my task...')

    # Make a request to the website
    url = "https://vegetablemarketprice.com/market/maharashtra/today"
    response = requests.get(url)

    # Create a BeautifulSoup object
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find the table on the webpage
    table = soup.find('table')

    # Find the table headers
    headers = []
    for th in table.find_all('th'):
        headers.append(th.text.strip())

    # Find the table rows with id=todayVetableTableRows
    rows = []
    for tr in table.find_all('tr', {'class': 'todayVetableTableRows'}):
        row = []
        for td in tr.find_all('td'):
            row.append(td.text.strip())
        rows.append(row)

    # Create the pandas DataFrame
    # df = pd.DataFrame(rows, columns=headers)

    # Print the DataFrame
    print(rows[0])

        