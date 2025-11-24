namespace SpringApiClient
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.cmbContinents = new System.Windows.Forms.ComboBox();
            this.btnLoadCountries = new System.Windows.Forms.Button();
            this.btnLoadContinents = new System.Windows.Forms.Button();
            this.btnSortAlphabetically = new System.Windows.Forms.Button();
            this.lstResults = new System.Windows.Forms.ListBox();
            this.SuspendLayout();
            // 
            // cmbContinents
            // 
            this.cmbContinents.FormattingEnabled = true;
            this.cmbContinents.Location = new System.Drawing.Point(747, 24);
            this.cmbContinents.Name = "cmbContinents";
            this.cmbContinents.Size = new System.Drawing.Size(159, 21);
            this.cmbContinents.TabIndex = 0;
            // 
            // btnLoadCountries
            // 
            this.btnLoadCountries.Location = new System.Drawing.Point(770, 62);
            this.btnLoadCountries.Name = "btnLoadCountries";
            this.btnLoadCountries.Size = new System.Drawing.Size(136, 34);
            this.btnLoadCountries.TabIndex = 1;
            this.btnLoadCountries.Text = "Load Countries";
            this.btnLoadCountries.UseVisualStyleBackColor = true;
            this.btnLoadCountries.Click += new System.EventHandler(this.btnLoadCountries_Click_1); // Hookup
                                                                                                 // 
                                                                                                 // btnLoadContinents
                                                                                                 // 
            this.btnLoadContinents.Location = new System.Drawing.Point(609, 62);
            this.btnLoadContinents.Name = "btnLoadContinents";
            this.btnLoadContinents.Size = new System.Drawing.Size(136, 34);
            this.btnLoadContinents.TabIndex = 2;
            this.btnLoadContinents.Text = "Load Continents";
            this.btnLoadContinents.UseVisualStyleBackColor = true;
            this.btnLoadContinents.Click += new System.EventHandler(this.btnLoadContinents_Click_1); // Hookup
                                                                                                   // 
                                                                                                   // btnSortAlphabetically
                                                                                                   // 
            this.btnSortAlphabetically.Location = new System.Drawing.Point(443, 62);
            this.btnSortAlphabetically.Name = "btnSortAlphabetically";
            this.btnSortAlphabetically.Size = new System.Drawing.Size(143, 34);
            this.btnSortAlphabetically.TabIndex = 3;
            this.btnSortAlphabetically.Text = "Sort Alphabetically";
            this.btnSortAlphabetically.UseVisualStyleBackColor = true;
            this.btnSortAlphabetically.Click += new System.EventHandler(this.btnSortAlphabetically_Click_1); // Hookup
                                                                                                           // 
                                                                                                           // lstResults
                                                                                                           // 
            this.lstResults.FormattingEnabled = true;
            this.lstResults.Location = new System.Drawing.Point(27, 24);
            this.lstResults.Name = "lstResults";
            this.lstResults.Size = new System.Drawing.Size(300, 381);
            this.lstResults.TabIndex = 4;
            // 
            // Form1
            // 
            this.ClientSize = new System.Drawing.Size(918, 562);
            this.Controls.Add(this.lstResults);
            this.Controls.Add(this.btnSortAlphabetically);
            this.Controls.Add(this.btnLoadContinents);
            this.Controls.Add(this.btnLoadCountries);
            this.Controls.Add(this.cmbContinents);
            this.Name = "Form1";
            this.Text = "Spring API Client";
            this.ResumeLayout(false);
        }


        #endregion

        private System.Windows.Forms.ComboBox cmbContinents;
        private System.Windows.Forms.Button btnLoadCountries;
        private System.Windows.Forms.Button btnLoadContinents;
        private System.Windows.Forms.Button btnSortAlphabetically;
        private System.Windows.Forms.ListBox lstResults;
    }
}

