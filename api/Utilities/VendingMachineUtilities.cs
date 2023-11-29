using api.Models;
using MySql.Data.MySqlClient;

namespace api.Utilities
{
    public class VendingMachineUtilities
    {
        public List<VendingMachine> GetAllVendingMachines(bool Deleted)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = "SELECT * FROM Vending Machines WHERE Deleted = 0 ORDER BY VendID ASC";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@Deleted", Deleted);
            cmd.Prepare();
            using MySqlDataReader rdr = cmd.ExecuteReader();
            List<VendingMachine> Allvendingmachines = new List<VendingMachine>();
            while(rdr.Read())
            {
                Allvendingmachines.Add(new VendingMachine(){VendID = rdr.GetInt32(0), Address = rdr.GetString(1), ZipCode = rdr.GetInt32(0)});
            }
            con.Close();
            return VendingMachine;
        }

        public void NewVendingMachines(VendingMachine myVendingMachine)
        {
            ConnectionString myConnection = new ConnectionString();
            string cs  = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();
            Console.WriteLine("New Vending Machine");

            string stm = @"INSERT INTO Vending Machines(Address, ZipCode) VALUES(@Address, @ZipCode)";

            using var cmd = new MySqlCommand(stm, con);

            cmd.Parameters.AddWithValue("@Address", myVendingMachine.Address);
            cmd.Parameters.AddWithValue("@ZipCode", myVendingMachine.ZipCode);

            cmd.Prepare();

            cmd.ExecuteNonQuery();
        }
    }
}