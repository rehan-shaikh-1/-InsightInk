import pandas as pd
import os
from datetime import datetime

# Create test data
test_data = {
    'name': 'Test User',
    'email': 'test@example.com',
    'subject': 'Test Subject',
    'message': 'This is a test message',
    'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
}

# Create a data directory if it doesn't exist
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)
    print(f"Created data directory at: {DATA_DIR}")

EXCEL_FILE = os.path.join(DATA_DIR, 'test_contact.xlsx')
print(f"Excel file will be saved to: {EXCEL_FILE}")

# Create DataFrame from the test data
df_new = pd.DataFrame([test_data])
print(f"Test data: {test_data}")

try:
    # Save to Excel
    df_new.to_excel(EXCEL_FILE, index=False)
    print(f"Successfully saved test data to {EXCEL_FILE}")
    
    # Read it back to verify
    df_read = pd.read_excel(EXCEL_FILE)
    print(f"Successfully read data back, {len(df_read)} rows found")
    print(f"Data read: {df_read.to_dict('records')[0]}")
    
    print("\nTEST SUCCESSFUL: Excel functionality is working correctly!")
except Exception as e:
    print(f"ERROR: {str(e)}")
    print("\nTEST FAILED: There's an issue with Excel functionality.") 