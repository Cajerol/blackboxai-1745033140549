
Built by https://www.blackbox.ai

---

```markdown
# Corona POS

## Project Overview
Corona POS is a Point of Sale system designed to streamline the management of sales, inventory, and user roles within a business. This web application allows for user authentication, inventory management, and sales processing, all while ensuring a user-friendly interface built with modern web technologies like HTML, CSS, and JavaScript.

## Installation
To install and run the Corona POS application, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/corona-pos.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd corona-pos
   ```

3. **Open the Application:**
   - You can open the `index.html` file directly in your web browser or set up a local server if you plan to run it in a development environment.

## Usage
After setting up the application, follow these steps to use it:

1. Open the `index.html` file in your web browser.
2. You will be redirected to the `login.html` page.
3. Use the default credentials:
   - **Username:** admin@corona.com
   - **Password:** admin123
4. Once logged in, navigate through the application to manage sales, inventory, and user roles.

## Features
- **User Authentication:** Secure login system to manage different roles (e.g., Admin, Seller).
- **Sales Management:** Process sales with options to scan products via barcode.
- **Inventory Management:** Manage product stock, including adding, editing, and deleting items.
- **User Management:** Admin can add, edit, or delete users and their roles.
- **Responsive Design:** Mobile-friendly layout for ease of use on different devices.

## Dependencies
The application uses the following libraries:
- **Tailwind CSS** for styling the UI.
- **Font Awesome** for icons.

These libraries are included via CDNs in the HTML files.

## Project Structure
```
/corona-pos
|-- index.html         # Redirects to login page
|-- login.html         # User authentication page
|-- base.html          # Main dashboard after logging in
|-- venta.html         # Sales processing page
|-- inventario.html    # Inventory management page
|-- usuarios.html      # User management page
|-- test.html          # Utility for testing localStorage
|-- debug.html         # Debugging localStorage state
|-- storage-test.html   # Test localStorage interactions
|-- scan-test.html     # Barcode scanning test
|-- test2.html         # Additional test page
|-- venta-new.html     # Another version of sales page (unused)
```

### Note:
- The application's data is stored in the browser's `localStorage`, so you can test it without a backend server.

## Contribution
Contributions are welcome! Please fork the repository and create a pull request for any changes you would like to propose.

## License
This project is licensed under the MIT License.
```

Feel free to customize any specific details, such as the repository URL or license, based on your project's actual configuration and requirements.