module br.com.javamongodb {
    requires javafx.controls;
    requires javafx.fxml;


    opens br.com.javamongodb to javafx.fxml;
    exports br.com.javamongodb;
}