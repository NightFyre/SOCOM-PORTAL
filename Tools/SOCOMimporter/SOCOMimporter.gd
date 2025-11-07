@tool
extends EditorPlugin

var dock

func _enter_tree() -> void:
	# Initialization of the plugin goes here.
	add_custom_type("SOCOMimporter", "Button", preload("importer_button.gd"), preload("icon.svg"))
	dock = preload("res://addons/SOCOMimporter/SOCOMimporter_dock.tscn").instantiate()
	
	add_control_to_dock(DOCK_SLOT_LEFT_BR, dock)
	pass

func _exit_tree() -> void:
	# Clean-up of the plugin goes here.
	remove_custom_type("SOCOMimporter")
	remove_control_from_docks(dock)
	dock.free()
	pass
