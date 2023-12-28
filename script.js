let packages = [];

function showCreatePackageForm() {
	hideAllForms();
	const createPackageForm = document.getElementById("createPackageForm");
    const formcreate = document.getElementById("formcreatepackage");
	createPackageForm.classList.remove("hidden");
    formcreate.classList.remove("hidden");
}

function showUpdateWeightForm() {
	hideAllForms();
	const updateWeightForm = document.getElementById("updateWeightForm");
	updateWeightForm.classList.remove("hidden");
}

function hideAllForms() {
	const forms = document.getElementsByTagName("form");
	for (let i = 0; i < forms.length; i++) {
		forms[i].classList.add("hidden");
	}
}

function createPackage(event) {
	event.preventDefault();

	const packageId = document.getElementById("packageId").value;
	const senderName = document.getElementById("senderName").value;
	const recipientName = document.getElementById("recipientName").value;
	const weight = parseFloat(document.getElementById("weight").value);

	const package = {
		packageId: packageId,
		senderName: senderName,
		recipientName: recipientName,
		weight: weight,
	};

	packages.push(package);

	document.getElementById("output").innerHTML = "Package created successfully.";
}

function listPackages() {
	hideAllForms();

	let output = "<h2>List of Packages</h2>";

	if (packages.length === 0) {
		output += "No packages found.";
	} else {
		output += "<table>";
		output +=
			"<tr><th>Package ID</th><th>Sender</th><th>Recipient</th><th>Weight (kg)</th></tr>";

		for (let i = 0; i < packages.length; i++) {
			output += "<tr>";
			output += "<td>" + packages[i].packageId + "</td>";
			output += "<td>" + packages[i].senderName + "</td>";
			output += "<td>" + packages[i].recipientName + "</td>";
			output += "<td>" + packages[i].weight + "</td>";
			output += "</tr>";
		}

		output += "</table>";
	}

	document.getElementById("output").innerHTML = output;
}

function calculateShippingCost() {
	hideAllForms();

	const packageId = prompt("Enter the package ID:");

	const package = packages.find(function (p) {
		return p.packageId === packageId;
	});

	if (package) {
		const weight = package.weight;
		const shippingCost = calculateCost(weight);

		document.getElementById("output").innerHTML =
			"Shipping cost for Package ID " + packageId + ": $" + shippingCost;
	} else {
		document.getElementById("output").innerHTML = "Package not found.";
	}
}

function calculateCost(weight) {
	// Add your own shipping cost calculation logic here
	// For example, a simple calculation based on weight
	return weight * 2.5;
}

function updatePackageWeight(event) {
	event.preventDefault();

	const packageId = document.getElementById("packageIdToUpdate").value;
	const newWeight = parseFloat(document.getElementById("newWeight").value);

	const package = packages.find(function (p) {
		return p.packageId === packageId;
	});

	if (package) {
		package.weight = newWeight;
		document.getElementById("output").innerHTML =
			"Package weight updated successfully.";
	} else {
		document.getElementById("output").innerHTML = "Package not found.";
	}
}
