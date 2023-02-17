import { toast } from "react-toastify";

class apiExpenseService {
  BASE_URL = "https://expense-tracker-87204-default-rtdb.firebaseio.com/";
  static getInstance() {
    return new apiExpenseService();
  }

  addExpenseItem = async (expense, localId) => {
    const response = await fetch(
      this.BASE_URL + localId + "/expense_tracker.json",
      {
        method: "POST",
        body: JSON.stringify({
          localId: expense.localId,
          id: expense.expenseCost,
          expenseCost: expense.expenseCost,
          description: expense.description,
          category: expense.category,
          date: expense.date,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const data2 = await response.json();
      alert("Sending data failed");
    }
  };

  getExpenseItem = async (localId) => {
    const response = await fetch(
      this.BASE_URL + localId + "/expense_tracker.json",
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const data2 = await response.json();
    }
  };
  deleteExpenseItem = async (name, localId) => {
    const response = await fetch(
      this.BASE_URL + localId + "/expense_tracker/" + name + ".json",
      {
        method: "DELETE",
        redirect: "follow",
      }
    );
    if (response.ok) {
      const data = await response.json();
      toast.success("Item deleted successfully");
      return data;
    } else {
    }
  };
  editExpenseItem = async (name) => {
    const response = await fetch(
      this.BASE_URL + name.localId + "/expense_tracker/" + name.name + ".json",
      {
        method: "PUT",
        body: JSON.stringify({
          localId: name.localId,
          id: name.expenseCost,
          expenseCost: name.expenseCost,
          description: name.description,
          category: name.category,
          date: name.date,
        }),
        redirect: "follow",
      }
    );
    if (response.ok) {
      const data = await response.json();
      toast.success("Item expense updated.")
      return data;
    } else {
      const data2 = await response.json();
    }
  };
}

export const ApiExpenseService = apiExpenseService.getInstance();
