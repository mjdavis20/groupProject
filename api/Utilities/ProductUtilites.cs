using api.Models;
using MySql.Data.MySqlClient;

namespace api.Utilities
{
    public class ProductUtilites 
    {
        public List<Product> GetAllProducts(bool Deleted)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = "SELECT * FROM Products WHERE Deleted = 0 ORDER BY ProductID ASC";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@Deleted", Deleted);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();
            List<Product> Allproducts = new List<Product>();
            while(rdr.Read())
            {
                Allproducts.Add(new Product(){ProductID = rdr.GetInt32(0), Quantity = rdr.GetInt32(1), Cost = rdr.GetDouble(2), Name = rdr.GetString(3), Sold = rdr.GetBoolean(4), Deleted = rdr.GetBoolean(5), VendID = rdr.GetInt32(6)});
            }
            con.Close();
            return Allproducts;
        }
        public List<Product> GetProductById(int ProductID)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = "SELECT * FROM Products WHERE id = @ProductID";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@ProductID", ProductID);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();
            List<Product> Allproducts = new List<Product>();
            while(rdr.Read())
            {
                Allproducts.Add(new Product(){ProductID = rdr.GetInt32(0), Quantity = rdr.GetInt32(1), Cost = rdr.GetDouble(2), Name = rdr.GetString(3), Sold = rdr.GetBoolean(4), Deleted = rdr.GetBoolean(5), VendID = rdr.GetInt32(6)});
            }
            con.Close();
            return Allproducts;
        }

//Not sure how to get this table to display in Controller if used
        public List<Product> GetSoldProducts(bool Sold)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = "SELECT * FROM Products WHERE Sold = 1 ORDER BY ProductID ASC";
            using var cmd = new MySqlCommand(stm, con);
            MySqlDataReader rdr = cmd.ExecuteReader();
            List<Product> Allproducts = new List<Product>();
            while(rdr.Read())
            {
                Allproducts.Add(new Product(){ProductID = rdr.GetInt32(0), Quantity = rdr.GetInt32(1), Cost = rdr.GetDouble(2), Name = rdr.GetString(3), Sold = rdr.GetBoolean(4), Deleted = rdr.GetBoolean(5), VendID = rdr.GetInt32(6)});
            }
            con.Close();
            return Allproducts;
        }

        public void CreateProduct(Product myProduct)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            Console.WriteLine("New Product");

            string stm = @"INSERT INTO Products(Quantity, Cost, Name, Sold, Deleted, VendID) VALUES(@Quantity, @Cost, @Name, @Sold, @Deleted, @VendID)";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@Quantity", myProduct.Quantity);
            cmd.Parameters.AddWithValue("@Cost", myProduct.Cost);
            cmd.Parameters.AddWithValue("@Name", myProduct.Name);
            cmd.Parameters.AddWithValue("@Sold", myProduct.Sold);
            cmd.Parameters.AddWithValue("@Deleted", myProduct.Deleted);
            cmd.Parameters.AddWithValue("@VendID", myProduct.VendID);

            cmd.Prepare();

            cmd.ExecuteNonQuery();
        }




    }
}